import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import snippetReducer from './features/snippets';
import savedSnippetsReducer from './features/snippets/savedSnippetsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		snippets: snippetReducer,
		savedSnippets: savedSnippetsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
