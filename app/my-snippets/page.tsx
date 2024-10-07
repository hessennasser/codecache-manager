'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchForm } from '@/components/shared/snippet/SearchForm';
import { SnippetCard } from '@/components/shared/snippet/SnippetCard';
import { fetchMySnippets } from '@/redux/features/snippets/snippetSlice';
import Pagination from '@/components/shared/Pagination';
import { Snippet } from '@/redux/features/snippets/types';

export default function MySnippetsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { snippets, loading } = useAppSelector(state => state.snippets);

	const searchTerm =
		typeof searchParams.search === 'string' ? searchParams.search : '';
	const selectedLanguage =
		typeof searchParams.language === 'string' ? searchParams.language : '';
	const selectedTag =
		typeof searchParams.tag === 'string' ? searchParams.tag : '';
	const page =
		typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;

	useEffect(() => {
		const tagsAsArray = selectedTag.split(',').filter(Boolean);
		dispatch(
			fetchMySnippets({
				search: searchTerm,
				language: selectedLanguage,
				tag: tagsAsArray,
				page,
			}),
		);
	}, [dispatch, searchTerm, selectedLanguage, selectedTag, page]);

	const handleSearch = (
		newSearchTerm: string,
		newLanguage: string,
		newTag: string,
	) => {
		const params = new URLSearchParams();
		if (newSearchTerm) params.set('search', newSearchTerm);
		if (newLanguage !== '') params.set('language', newLanguage);
		if (newTag !== '') params.set('tag', newTag);
		params.set('page', '1'); // Reset to first page on new search
		router.push(`/my-snippets?${params.toString()}`);
	};

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);
		params.set('page', newPage.toString());
		router.push(`/my-snippets?${params.toString()}`);
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
				<h1 className='text-3xl font-bold'>My Snippets</h1>
				<Link href='/create-snippet'>
					<Button>Create New Snippet</Button>
				</Link>
			</div>

			<SearchForm
				initialSearchTerm={searchTerm}
				initialLanguage={selectedLanguage}
				initialTag={selectedTag}
				onSearch={handleSearch}
			/>

			{snippets.snippets.length === 0 ? (
				<div className='text-center text-gray-500 mt-8'>
					<p>No snippets found. Create your first snippet!</p>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{snippets.snippets.map((snippet: Snippet) => (
							<SnippetCard key={snippet.id} snippet={snippet} />
						))}
					</div>
					<div className='mt-8'>
						<Pagination
							pagination={snippets.pagination}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
}
