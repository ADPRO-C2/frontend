import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	token: string;
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	token: '',
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		logout: state => {
			state.isAuthenticated = false;
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		}
	},
});

export const { setAuth, logout, finishInitialLoad, setToken } = authSlice.actions;
export default authSlice.reducer;
