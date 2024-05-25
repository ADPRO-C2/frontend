import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8080/`,
        credentials: 'include',
    }),
	endpoints: builder => ({}),
});

interface User {
	message: string;
	id: number;
	username: string;
	email: string;
	address: string;
	balance: number;
}


const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: ({ username, password }) => ({
				url: '/login',
				method: 'POST',
				body: { username, password },
			}),
		}),
		register: builder.mutation({
			query: ({
				username,
				email,
				address,
				password
			}) => ({
				url: '/register',
				method: 'POST',
				body: { 
					username,
					email,
					address,
					password
				},
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: '/profile',
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
		getProfile: builder.query<User, void>({
			query: () => ({
				url: '/profile',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
		updateAddress: builder.mutation({
			query: ({ newAddress }) => ({
				url: '/profile/address',
				method: 'PUT',
				body: { newAddress },
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
		updatePassword: builder.mutation({
			query: ({ oldPassword, newPassword }) => ({
				url: '/profile/password',
				method: 'PUT',
				body: { oldPassword, newPassword },
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
		deleteAccount: builder.mutation({
			query: () => ({
				url: '/profile/delete',
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useVerifyMutation,
	useGetProfileQuery,
	useUpdateAddressMutation,
	useUpdatePasswordMutation,
	useDeleteAccountMutation,
} = authApiSlice;
