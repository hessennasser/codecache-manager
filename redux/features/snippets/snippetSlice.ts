import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchHomeSnippets = createAsyncThunk(
	'snippets/fetchAll',
	async (
		{
			page = 1,
			search = '',
			limit = 10,
			programmingLanguage = '',
			tags = [],
		}: {
			page?: number;
			search?: string;
			limit?: number;
			programmingLanguage?: string;
			tags?: string[];
		},
		{ rejectWithValue },
	) => {
		try {
			const response = await api.get(
				`/snippets?page=${page}&search=${search}&limit=${limit}&programmingLanguage=${programmingLanguage}&tags=${tags.join()}`,
			);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);

export const fetchMySnippets = createAsyncThunk(
	'snippets/fetchMine',
	async (
		params: {
			page?: number;
			search?: string;
			limit?: number;
			programmingLanguage?: string;
			tags?: string[];
		},
		{ rejectWithValue },
	) => {
		try {
			const queryParams = new URLSearchParams();

			// Only add parameters that have values
			if (params.page) queryParams.append('page', params.page.toString());
			if (params.search) queryParams.append('search', params.search);
			if (params.limit) queryParams.append('limit', params.limit.toString());
			if (params.programmingLanguage)
				queryParams.append('programmingLanguage', params.programmingLanguage);
			if (params.tags && params.tags.length > 0)
				queryParams.append('tags', params.tags.join(','));

			const response = await api.get(`/me/snippets?${queryParams.toString()}`);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.errors || 'An error occurred',
			);
		}
	},
);

export const fetchSnippetById = createAsyncThunk(
	'snippets/fetchById',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await api.get(`/me/snippets/${id}`);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);

export interface SnippetData {
	title: string;
	description?: string;
	content: string;
	tags: string[];
	programmingLanguage: string;
	isPublic: boolean;
}

export const createSnippet = createAsyncThunk(
	'snippets/create',
	async (snippetData: SnippetData, { rejectWithValue }) => {
		try {
			const response = await api.post('/me/snippets', snippetData);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data || 'An error occurred');
		}
	},
);

export const updateSnippet = createAsyncThunk(
	'snippets/update',
	async (
		{ id, snippetData }: { id: number; snippetData: FormData },
		{ rejectWithValue },
	) => {
		try {
			const response = await api.post(`/me/snippets/${id}`, snippetData);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);

export const deleteSnippet = createAsyncThunk(
	'snippets/delete',
	async (id: number, { rejectWithValue }) => {
		try {
			await api.delete(`/me/snippets/${id}`);
			return id;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);
