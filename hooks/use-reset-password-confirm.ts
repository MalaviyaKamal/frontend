// 'use client';

// import { useState, ChangeEvent, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import { useResetPasswordConfirmMutation } from '@/redux/features/authApiSlice';
// import { toast } from 'react-toastify';


// export default function useResetPasswordConfirm(uid: string, token: string) {
// 	const router = useRouter();

// 	const [resetPasswordConfirm, { isLoading }] =
// 		useResetPasswordConfirmMutation();

// 	const [formData, setFormData] = useState({
// 		new_password: '',
// 		re_new_password: '',
// 	});

// 	const { new_password, re_new_password } = formData;

// 	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = event.target;

// 		setFormData({ ...formData, [name]: value });
// 	};

// 	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		resetPasswordConfirm({ uid, token, new_password, re_new_password })
// 			.unwrap()
// 			.then(() => {
// 				toast.success('Password reset successful');
// 				router.push('/auth/login');
// 			})
// 			.catch(() => {
// 				toast.error('Password reset failed');
// 			});
// 	};

// 	return {
// 		new_password,
// 		re_new_password,
// 		isLoading,
// 		onChange,
// 		onSubmit,
// 	};
// }
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useResetPasswordConfirmMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export type FormData = {
  new_password: string;
  re_new_password: string;
};

export default function useResetPasswordConfirm(uid: string, token: string) {
  const router = useRouter();

  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

  const { register,watch, handleSubmit, formState: { errors }, setError } = useForm<FormData>({mode: 'onBlur'});

  const onSubmit = (data: FormData) => {
    resetPasswordConfirm({ uid, token, new_password: data.new_password, re_new_password: data.re_new_password })
      .unwrap()
      .then((response) => {
		console.log('response',response);
        toast.success('Password reset successful');
        router.push('/auth/login');
      })
      .catch((err) => {
		if (err.data.new_password) {
			setError("new_password", { type: "manual", message: err.data.email.join('||') });
		}
		if (err.data.re_new_password) {
			setError("re_new_password", { type: "manual", message: err.data.email.join('||') });
		}
		if (err.data.detail) {
			setError("root", { type: "manual", message: err.data.detail });
		}
        // Handle error
        toast.error('Password reset failed');
      });
  };

  return {
    isLoading,
    register,
	setError,
    errors,
	watch,
	onSubmit: handleSubmit(onSubmit),
  };
}
