'use client';

import React, { Suspense, useEffect } from 'react';
import { SearchForm } from '../shared/snippet/SearchForm';
import { SnippetCard } from '../shared/snippet/SnippetCard';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'next/navigation';
import { fetchHomeSnippets } from '@/redux/features/snippets/snippetSlice';
import Pagination from '../shared/Pagination';

type Props = {
	searchTerm: string;
	selectedProgrammingLanguage: string;
	selectedTags: string[];
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function MainSnippetsPage({
	searchTerm,
	selectedProgrammingLanguage,
	selectedTags,
	searchParams,
}: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const homeSnippets = useAppSelector(state => state.snippets.homeSnippets);

	const handleSearch = (
		newSearchTerm: string,
		newProgrammingLanguage: string,
		newTags: string[],
	) => {
		const params = new URLSearchParams();
		if (newSearchTerm) params.set('search', newSearchTerm);
		if (newProgrammingLanguage !== 'all')
			params.set('programmingLanguage', newProgrammingLanguage);
		if (newTags.length > 0) params.set('tags', newTags.join(','));
		params.set('page', '1');
		router.push(`/?${params.toString()}`);

		dispatch(
			fetchHomeSnippets({
				page: 1,
				search: newSearchTerm,
				programmingLanguage: newProgrammingLanguage,
				tags: newTags,
				limit: 10,
			}),
		);
	};

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);
		params.set('page', newPage.toString());
		router.push(`/?${params.toString()}`);
	};

	useEffect(() => {
		handleSearch(searchTerm, selectedProgrammingLanguage, selectedTags);
	}, []);

	return (
		<div className='container py-8'>
			<Suspense fallback={<div>Loading search form...</div>}>
				<SearchForm
					initialSearchTerm={searchTerm}
					initialProgrammingLanguage={selectedProgrammingLanguage}
					initialTags={selectedTags}
					onSearch={handleSearch}
				/>
			</Suspense>

			{homeSnippets.snippets.length === 0 ? (
				<div className='text-center text-gray-500 mt-8'>
					<p>No snippets found. Try searching for something else.</p>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{homeSnippets.snippets.map(snippet => (
							<SnippetCard key={snippet.id} snippet={snippet} />
						))}
					</div>
					<div className='mt-8'>
						<Pagination
							pagination={homeSnippets.pagination}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</div>
	);
}
