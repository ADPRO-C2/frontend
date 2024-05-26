'use client';

import { useGetProfileQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Page() {
	const { data: user, isLoading, isFetching, refetch } = useGetProfileQuery();

    useEffect(() => {
        refetch();
    }
    , []);

	const config = [
		{
			label: 'Username',
			value: user?.username,
		},
		{
			label: 'Email',
			value: user?.email,
		},
		{
			label: 'Address',
			value: user?.address,
		},
        {
			label: 'Balance',
			value: String(user?.balance),
		},
	];

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	return (
		<>
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Profile
					</h1>
				</div>
			</header>
			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
				<List config={config} />
                <Link className='mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' href='/profile/topup'>{isLoading || isFetching ? <Spinner sm /> : 'Top Up'}</Link>
                <Link className='mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' href='/profile/address'>{isLoading || isFetching ? <Spinner sm /> : 'Update Address'}</Link>
                <Link className='mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' href='/profile/password'>{isLoading || isFetching ? <Spinner sm /> : 'Update Password'}</Link>
                <Link className='mt-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600' href='/profile/delete'>{isLoading || isFetching ? <Spinner sm /> : 'Delete Account'}</Link>
			</main>
		</>
	);
}
