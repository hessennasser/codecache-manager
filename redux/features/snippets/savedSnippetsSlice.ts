import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "@/utils/toastUtils";
import api from "@/utils/api";
import { Snippet } from "./types";

export const saveSnippet = createAsyncThunk(
  "savedSnippets/saveSnippet",
  async (snippetId: string) => {
    const response = await api.post(`/saved-snippets/${snippetId}`);
    return response.data;
  }
);

export const unsaveSnippet = createAsyncThunk(
  "savedSnippets/unsaveSnippet",
  async (snippetId: string) => {
    await api.delete(`/saved-snippets/${snippetId}`);
    return snippetId;
  }
);

export const fetchSavedSnippets = createAsyncThunk(
  "savedSnippets/fetchSavedSnippets",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const response = await api.get(
      `/saved-snippets?page=${page}&limit=${limit}`
    );
    return response.data;
  }
);

export const checkIfSnippetIsSaved = createAsyncThunk(
  "savedSnippets/checkIfSnippetIsSaved",
  async (snippetId: string) => {
    const response = await api.get(`/saved-snippets/${snippetId}/is-saved`);
    return response.data;
  }
);

// Define an interface for the slice state
interface SavedSnippetsState {
  snippets: Snippet[];
  pagination:  {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
  loading: boolean;
  error: string;
}

const savedSnippetsSlice = createSlice({
  name: "savedSnippets",
  initialState: {
    snippets: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    error: "",
  } as SavedSnippetsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSnippet.fulfilled, (state, action) => {
        showToast("success", "Snippet saved successfully");
      })
      .addCase(saveSnippet.rejected, (state, action) => {
        showToast("error", "Failed to save snippet");
      })
      .addCase(unsaveSnippet.fulfilled, (state, action) => {
        showToast("success", "Snippet unsaved successfully");
      })
      .addCase(unsaveSnippet.rejected, (state, action) => {
        showToast("error", "Failed to unsave snippet");
      })
      .addCase(fetchSavedSnippets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedSnippets.fulfilled, (state, action) => {
        state.snippets = action.payload.snippets;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchSavedSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch saved snippets";
        showToast("error", "Failed to fetch saved snippets");
      });
  },
});

export default savedSnippetsSlice.reducer;
