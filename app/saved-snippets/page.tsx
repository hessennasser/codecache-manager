'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SnippetCard } from '@/components/shared/snippet/SnippetCard';
import { fetchSavedSnippets } from '@/redux/features/snippets/savedSnippetsSlice';
import Pagination from '@/components/shared/Pagination';
import { Snippet } from '@/redux/features/snippets/types';

export default function SavedSnippetsPage() {
  const dispatch = useAppDispatch();
  const { snippets, loading, pagination } = useAppSelector((state) => state.savedSnippets);

  useEffect(() => {
    dispatch(fetchSavedSnippets({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchSavedSnippets({ page: newPage, limit: 10 }));
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Saved Snippets</h1>
      </div>

      {snippets.length === 0 ? (
        <div className='text-center text-gray-500 mt-8'>
          <p>No saved snippets found. Start saving some snippets!</p>
          <Link href='/' className='mt-4 inline-block'>
            <Button>Browse Snippets</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {snippets.map((snippet: Snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
          <div className='mt-8'>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
