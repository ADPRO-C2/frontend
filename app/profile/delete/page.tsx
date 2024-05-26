'use client';

import { useDeleteAccountMutation } from '@/redux/features/authApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/authSlice';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/common';


export default function Page() {
    const dispatch = useAppDispatch();

	const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

    const handleDelete = () => {
		deleteAccount(undefined)
			.unwrap()
			.then(() => {
                toast.success('Account deleted');
				dispatch(logout());
			});
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Delete Account
				</h2>
                <p className='mt-5 text-center text-sm text-gray-600'>Are you sure you want to delete your account?</p>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <button disabled={isLoading} onClick={handleDelete} className='flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'>{isLoading ? <Spinner sm /> : `Delete Account`}</button>
                <Link className='mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' href='/profile'>Back</Link>
			</div>
		</div>
	);
}
