import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { useForm } from "react-hook-form";
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


export type FormData = {
	email: string;
	password: string;
  };

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	  } = useForm<FormData>({mode: 'onBlur'});

	const onSubmit = (data: FormData) => {

		login({ email: data.email,password: data.password })
			.unwrap()
			.then((response) => {
				console.log('response',response);

				dispatch(setAuth());
				// Cookies.set('loggedIn', 'true', { expires: 1 });
				toast.success('Logged in');
				router.push('/dashboard');
			})
			.catch((err) => {
				console.log('err',err);
				setError("root", { type: "manual", message: err.data.detail });
				toast.error('Failed to log in');
			});
	};

	return {
		isLoading,
		register,
		setError,
		errors,
		onSubmit: handleSubmit(onSubmit),
	};
}
