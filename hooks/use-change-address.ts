import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateAddressMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useChangeAddress() {
	const router = useRouter();
	const [updateAddress, { isLoading }] = useUpdateAddressMutation();

	const [formData, setFormData] = useState({
		newAddress: '',
	});

	const { newAddress } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		updateAddress({ newAddress })
			.unwrap()
			.then(() => {
				toast.success('Address updated');
				router.push('/profile');
			})
			.catch(() => {
				toast.error('Failed to update address');
			});
	};

	return {
        newAddress,
		isLoading,
		onChange,
		onSubmit,
	};
}
