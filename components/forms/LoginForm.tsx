'use client';

import { useLogin } from '@/hooks';
import { Input } from '@/components/forms';
import { Spinner } from '@/components/common';
import { Button } from "@/components/ui/button";

export default function LoginForm() {
	const { register, setError, isLoading, onSubmit, errors } = useLogin();

	return (
		<form noValidate className='space-y-6' onSubmit={onSubmit}>

			<Input
				key="email"
				labelId="email"
				type="email"
				required={true}
				register={register}
				validation={{
					required: 'Email is required',
					pattern: {
					  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
					  message: 'Invalid email address',
					},
				  }}
				error={errors.email}>
				Email Address
			</Input>
			<Input
				key="Password"
				labelId="password"
				type="password"
				required={true}
				link={{linkText: 'Forgot password?',
						linkUrl: '/password-reset',}}
				register={register}
				validation={{
					required: 'Password is required',
					minLength: {
					  value: 8,
					  message: 'Password must be at least 8 characters',
					},
				  }}
				error={errors.password}>
				Password
			</Input>
			

			<div>
				<Button
					type='submit'
					className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `Login`}
				</Button>
			</div>
			{errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
		</form>
	);
}
