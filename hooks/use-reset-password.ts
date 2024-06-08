'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useResetPasswordMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form';



export type FormData = {
	email: string;
  };


export default function useResetPassword() {
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	  } = useForm<FormData>({mode: 'onBlur'});


	  const onSubmit = (data: FormData) => {

		resetPassword(data.email )
			.unwrap()
			.then((response) => {
				toast.success('Request sent, check your email for reset link');
				// dispatch(setAuth());
				// Cookies.set('loggedIn', 'true', { expires: 1 });
				
				// router.push('/dashboard');
			})
			.catch((err) => {
				if (err.data.email) {
					setError("email", { type: "manual", message: err.data.email.join('||') });
				}
	
				if (err.data.detail) {
					setError("root", { type: "manual", message: err.data.detail });
				}
				toast.error('Failed to log in');
			});
	};

	// const onSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();

	// 	resetPassword(email)
	// 		.unwrap()
	// 		.then(() => {
	// 			toast.success('Request sent, check your email for reset link');
	// 		})
	// 		.catch(() => {
	// 			toast.error('Failed to send request');
	// 		});
	// };

	return {
		isLoading,
		register,
		setError,
		errors,
		onSubmit: handleSubmit(onSubmit),
	};
}
