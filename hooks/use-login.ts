import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ username, password })
			.unwrap()
			.then((res) => {
				dispatch(setAuth());
				localStorage.setItem('token', res.token);
				toast.success('Logged in');
				router.push('/home');
			})
			.catch(() => {
				toast.error('Failed to log in');
			});
	};

	return {
		username,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
