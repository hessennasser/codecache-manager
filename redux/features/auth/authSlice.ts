import api from '@/lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	position: string;
	companyName: string;
	companyWebsite: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	role: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	error: string | null;
	isInitialized: boolean;
}

const initialState: AuthState = {
	user: null,
	token: Cookies.get('token') || null,
	isLoading: false,
	error: null,
	isInitialized: false,
};

interface LoginResponse {
	user: User;
	access_token: string;
}

interface RegisterResponse {
	user: User;
	access_token: string;
}

interface RegisterData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	username: string;
	position?: string;
	companyName?: string;
	companyWebsite?: string;
}

export const loginUser = createAsyncThunk(
	'/auth/login',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await api.post<LoginResponse>('auth/login', {
				email,
				password,
			});
			const { user, access_token } = response.data;
			Cookies.set('token', access_token, { expires: 7 }); // Store token in cookie for 7 days
			return { user, token: access_token };
		} catch (error) {
			return rejectWithValue('Login failed. Please check your credentials.');
		}
	},
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async (userData: RegisterData, { rejectWithValue }) => {
		try {
			const response = await api.post<RegisterResponse>(
				'auth/register',
				userData,
			);
			const { user, access_token } = response.data;
			Cookies.set('token', access_token, { expires: 7 }); // Store token in cookie for 7 days
			return { user, token: access_token };
		} catch (error) {
			return rejectWithValue('Registration failed. Please check your details.');
		}
	},
);

export const logoutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			Cookies.remove('token');
		} catch (error) {
			return rejectWithValue('Logout failed.');
		}
	},
);

export const getMe = createAsyncThunk(
	'auth/getMe',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<{ user: User }>('/me');
			return response.data;
		} catch (error) {
			return rejectWithValue('Failed to fetch user information.');
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				loginUser.fulfilled,
				(state, action: PayloadAction<{ user: User; token: string }>) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.error = null;
				},
			)
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<{ user: User; token: string }>) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.error = null;
				},
			)
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(logoutUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, state => {
				state.user = null;
				state.token = null;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(getMe.pending, state => {
				state.isLoading = true;
			})
			.addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(getMe.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default authSlice.reducer;
