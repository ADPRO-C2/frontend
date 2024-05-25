'use client';

import { useLogin } from '@/hooks';
import { Form } from '@/components/forms';

export default function LoginForm() {
	const { username, password, isLoading, onChange, onSubmit } = useLogin();

	const config = [
		{
			labelText: 'Username',
			labelId: 'username',
			type: 'text',
			value: username,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Sign in'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
