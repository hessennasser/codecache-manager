import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';
import { Snippet } from './types';

export const fetchSnippets = createAsyncThunk(
	'snippets/fetchAll',
	async (
		{
			page = 1,
			search = '',
			limit = 10,
		}: { page?: number; search?: string; limit?: number },
		{ rejectWithValue },
	) => {
		try {
			const response = await api.get(
				`/me/snippets?page=${page}&search=${search}&limit=${limit}`,
			);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
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
	language: string;
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

export const fetchSnippetJobs = createAsyncThunk(
	'snippets/fetchJobs',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get('/me/snippets/job');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);

export const fetchEmploymentStatuses = createAsyncThunk(
	'snippets/fetchStatuses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get('/me/snippets/status');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data.errors);
		}
	},
);
