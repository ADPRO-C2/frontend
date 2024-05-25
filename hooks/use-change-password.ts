import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdatePasswordMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useChangePassword() {
	const router = useRouter();
	const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

	const [formData, setFormData] = useState({
		oldPassword: '',
        newPassword: '',
	});

	const { oldPassword, newPassword } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		updatePassword({ oldPassword, newPassword })
			.unwrap()
			.then(() => {
				toast.success('Password updated');
				router.push('/profile');
			})
			.catch(() => {
				toast.error('Failed to update password');
			});
	};

	return {
        oldPassword,
        newPassword,
		isLoading,
		onChange,
		onSubmit,
	};
}
