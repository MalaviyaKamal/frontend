'use client';

import { useLogin } from '@/hooks';
import { Input } from '@/components/forms';
import { Spinner } from '@/components/common';

export default function LoginForm() {
	const { register, setError, isLoading, onSubmit, errors } = useLogin();

	// const config = [
	// 	{
	// 		labelText: 'Email address',
	// 		labelId: 'email',
	// 		type: 'email',
	// 		value: email,
	// 		required: true,
	// 	},
	// 	{
	// 		labelText: 'Password',
	// 		labelId: 'password',
	// 		type: 'password',
	// 		value: password,
	// 		link: {
	// 			linkText: 'Forgot password?',
	// 			linkUrl: '/password-reset',
	// 		},
	// 		required: true,
	// 	},
	// ];

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
			{/* <Input
				key="email"
				labelId="email"
				type="email"
				required={true}
				register={register}
				error={errors.email}>
				Email Address
			</Input> */}


			{/* {config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
			))} */}

			<div>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `Login`}
				</button>
			</div>
			{errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
		</form>
	);
}
