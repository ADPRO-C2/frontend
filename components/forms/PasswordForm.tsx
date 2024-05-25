'use client';

import { useChangePassword } from '@/hooks';
import { Form } from '@/components/forms';

export default function LoginForm() {
	const { oldPassword, newPassword, isLoading, onChange, onSubmit } = useChangePassword();

	const config = [
		{
			labelText: 'Old Password',
			labelId: 'oldPassword',
			type: 'password',
			value: oldPassword,
			required: true,
		},
		{
			labelText: 'New Password',
			labelId: 'newPassword',
			type: 'password',
			value: newPassword,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Change Password'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
