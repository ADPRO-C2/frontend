import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegister() {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		address: '',
		password: '',
		re_password: '',
	});

	const { username, email, address, password, re_password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password === re_password) {
			register({ username, email, address, password })
			.unwrap()
			.then(() => {
				toast.success('Successfully registered account');
				router.push('/auth/login');
			})
			.catch(() => {
				toast.error('Failed to register account');
			});
		} else {
			toast.error('Passwords do not match');
		}
	};

	return {
		username,
		email,
		address,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	};
}
