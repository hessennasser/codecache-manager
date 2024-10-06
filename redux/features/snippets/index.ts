// src/features/snippets/snippetSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showToast } from "@/utils/toastUtils";
import { Snippet, SnippetJob, EmploymentStatus, initialState } from "./types";
import {
  createSnippet,
  deleteSnippet,
  fetchSnippetById,
  fetchSnippetJobs,
  fetchSnippets,
  fetchEmploymentStatuses,
  updateSnippet,
} from "./snippetSlice";

const snippetSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSnippets.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: {
              snippets: Snippet[];
              pagination: any;
            };
          }>
        ) => {
          state.loading = false;
          state.snippets.snippets = action.payload.data.snippets;
          state.currentPage = action.payload.data.pagination.current_page;
          state.totalPages = action.payload.data.pagination.total_pages;
        }
      )
      .addCase(fetchSnippets.rejected, (state, action) => {
        state.loading = false;
        const errors = action.payload
          ? (action.payload as string | { status?: string; errors?: string[] })
          : "Failed to load snippets";
        showToast("error", errors);
      })
      .addCase(fetchSnippetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSnippetById.fulfilled,
        (state, action: PayloadAction<Snippet>) => {
          state.loading = false;
          state.selectedSnippet = action.payload;
        }
      )
      .addCase(fetchSnippetById.rejected, (state, action) => {
        state.loading = false;
        const errors = action.payload
          ? (action.payload as string | { status?: string; errors?: string[] })
          : "Failed to load snippet details";
        showToast("error", errors);
      })
      .addCase(createSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createSnippet.fulfilled,
        (state, action: PayloadAction<Snippet>) => {
          state.loading = false;
          showToast("success", "Snippet created successfully");
        }
      )
      .addCase(createSnippet.rejected, (state, action) => {
        state.loading = false;
        const errors = action.payload
          ? (action.payload as string | { status?: string; errors?: string[] })
          : "Failed to create snippet";
        showToast("error", errors);
      })
      .addCase(updateSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateSnippet.fulfilled,
        (state, action: PayloadAction<Snippet>) => {
          state.loading = false;
          showToast("success", "Snippet updated successfully");
        }
      )
      .addCase(updateSnippet.rejected, (state, action) => {
        state.loading = false;
        const errors = action.payload
          ? (action.payload as string | { status?: string; errors?: string[] })
          : "Failed to update snippet";
        showToast("error", errors);
      })
      .addCase(deleteSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteSnippet.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          showToast("success", "Snippet deleted successfully");
        }
      )
      .addCase(deleteSnippet.rejected, (state, action) => {
        state.loading = false;
        const errors = action.payload
          ? (action.payload as string | { status?: string; errors?: string[] })
          : "Failed to delete snippet";
        showToast("error", errors);
      })
      .addCase(
        fetchSnippetJobs.fulfilled,
        (state, action: PayloadAction<SnippetJob[]>) => {
          state.snippetJobs = action.payload;
        }
      )
      .addCase(
        fetchEmploymentStatuses.fulfilled,
        (state, action: PayloadAction<EmploymentStatus[]>) => {
          state.employmentStatuses = action.payload;
        }
      );
  },
});

export default snippetSlice.reducer;