'use client';

import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { set, useForm } from "react-hook-form";


export type FormData = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	re_password: string;
};

export default function useRegister() {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		watch,
		setError,
	} = useForm<FormData>({ mode: 'onTouched' });



	const onSubmit = (data: FormData) => {
		register(data)
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				router.push('/auth/login');
			})
			.catch((err) => {
				if (err.data.email) {
					setError("email", { type: "manual", message: err.data.email.join('||') });
				}
				if (err.data.password) {
					setError("password", { type: "manual", message: err.data.password.join('||') });
				}
				if (err.data.detail) {
					setError("root", { type: "manual", message: err.data.detail });
				}
				toast.error('Failed to register account');
			});
	};

	return {
		isLoading,
		setError,
		errors,
		watch,
		register: formRegister,
		onSubmit: handleSubmit(onSubmit),
	};
}
