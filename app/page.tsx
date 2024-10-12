import MainSnippetsPage from '@/components/pages/MainSnippetsPage';

export default function SnippetsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const searchTerm =
		typeof searchParams.search === 'string' ? searchParams.search : '';
	const selectedProgrammingLanguage =
		typeof searchParams.programmingLanguage === 'string'
			? searchParams.programmingLanguage
			: 'all';
	const selectedTags = Array.isArray(searchParams.tags)
		? searchParams.tags
		: typeof searchParams.tags === 'string'
		? searchParams.tags.split(',')
		: [];

	return (
		<MainSnippetsPage
			searchTerm={searchTerm}
			selectedProgrammingLanguage={selectedProgrammingLanguage}
			selectedTags={selectedTags}
			searchParams={searchParams}
		/>
	);
}
