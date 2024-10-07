import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import snippetReducer from './features/snippets';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		snippets: snippetReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
