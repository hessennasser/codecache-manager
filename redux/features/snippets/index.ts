// src/features/snippets/snippetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showToast } from '@/utils/toastUtils';
import { Snippet, initialState } from './types';
import {
	createSnippet,
	deleteSnippet,
	fetchSnippetById,
	updateSnippet,
	fetchHomeSnippets,
	fetchMySnippets,
} from './snippetSlice';

const snippetSlice = createSlice({
	name: 'snippets',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchHomeSnippets.pending, state => {
				state.loading = true;
			})
			.addCase(
				fetchHomeSnippets.fulfilled,
				(
					state,
					action: PayloadAction<{
						snippets: Snippet[];
						pagination: any;
					}>,
				) => {
					state.loading = false;
					state.homeSnippets.snippets = action.payload.snippets;
					state.homeSnippets.pagination = action.payload.pagination;
				},
			)
			.addCase(fetchHomeSnippets.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to load snippets';
				showToast('error', errors);
			})
			.addCase(fetchMySnippets.pending, state => {
				state.loading = true;
			})
			.addCase(
				fetchMySnippets.fulfilled,
				(
					state,
					action: PayloadAction<{
						data: {
							snippets: Snippet[];
							pagination: any;
						};
					}>,
				) => {
					state.loading = false;
					state.snippets.snippets = action.payload.data.snippets;
					state.snippets.pagination = action.payload.data.pagination;
				},
			)
			.addCase(fetchMySnippets.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to load snippets';
				showToast('error', errors);
			})
			.addCase(fetchSnippetById.pending, state => {
				state.loading = true;
			})
			.addCase(
				fetchSnippetById.fulfilled,
				(state, action: PayloadAction<Snippet>) => {
					state.loading = false;
					state.selectedSnippet = action.payload;
				},
			)
			.addCase(fetchSnippetById.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to load snippet details';
				showToast('error', errors);
			})
			.addCase(createSnippet.pending, state => {
				state.loading = true;
			})
			.addCase(
				createSnippet.fulfilled,
				(state, action: PayloadAction<Snippet>) => {
					state.loading = false;
					showToast('success', 'Snippet created successfully');
				},
			)
			.addCase(createSnippet.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to create snippet';
				showToast('error', errors);
			})
			.addCase(updateSnippet.pending, state => {
				state.loading = true;
			})
			.addCase(
				updateSnippet.fulfilled,
				(state, action: PayloadAction<Snippet>) => {
					state.loading = false;
					showToast('success', 'Snippet updated successfully');
				},
			)
			.addCase(updateSnippet.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to update snippet';
				showToast('error', errors);
			})
			.addCase(deleteSnippet.pending, state => {
				state.loading = true;
			})
			.addCase(
				deleteSnippet.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.loading = false;
					showToast('success', 'Snippet deleted successfully');
				},
			)
			.addCase(deleteSnippet.rejected, (state, action) => {
				state.loading = false;
				const errors = action.payload
					? (action.payload as string | { status?: string; errors?: string[] })
					: 'Failed to delete snippet';
				showToast('error', errors);
			});
	},
});

export default snippetSlice.reducer;
