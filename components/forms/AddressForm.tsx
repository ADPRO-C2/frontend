'use client';

import { useChangeAddress } from '@/hooks';
import { Form } from '@/components/forms';

export default function LoginForm() {
	const { newAddress, isLoading, onChange, onSubmit } = useChangeAddress();

	const config = [
		{
			labelText: 'New Address',
			labelId: 'newAddress',
			type: 'newAddress',
			value: newAddress,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Change Address'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
