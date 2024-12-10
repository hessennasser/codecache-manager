import { User } from '@/types/snippet';

export interface Snippet {
	id: string;
	title: string;
	description?: string;
	content: string;
	tags: {
		id: string;
		name: string;
	}[];
	programmingLanguage: string;
	userId: string;
	user: User;
	isPublic: boolean;
	viewCount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SnippetState {
	snippets: {
		snippets: Snippet[];
		pagination: {
			total: number;
			page: number;
			limit: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPrevPage: boolean;
		};
	};
	homeSnippets: {
		snippets: Snippet[];
		pagination: {
			total: number;
			page: number;
			limit: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPrevPage: boolean;
		};
	};
	selectedSnippet: Snippet | null;
	loading: boolean;
}

export const initialState: SnippetState = {
	snippets: {
		snippets: [],
		pagination: {
			total: 0,
			page: 1,
			limit: 10,
			totalPages: 0,
			hasNextPage: false,
			hasPrevPage: false,
		},
	},
	homeSnippets: {
		snippets: [],
		pagination: {
			total: 0,
			page: 1,
			limit: 10,
			totalPages: 0,
			hasNextPage: false,
			hasPrevPage: false,
		},
	},
	selectedSnippet: null,
	loading: false,
};
