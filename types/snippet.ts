import { Snippet } from '@/redux/features/snippets/types';

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
}

export interface SearchFormProps {
	initialSearchTerm: string;
	initialProgrammingLanguage: string;
	initialTag: string;
}

export interface SnippetCardProps {
	snippet: Snippet;
}

export interface MainSnippetsPageProps {
	searchParams: {
		search?: string;
		programmingLanguage?: string;
		tag?: string;
	};
	snippets: Snippet[];
}
