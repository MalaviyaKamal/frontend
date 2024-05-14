'use client';

import { useResetPassword } from '@/hooks';
import { Form, Input } from '@/components/forms';
import { Spinner } from '@/components/common';


export default function PasswordResetForm() {
	const { register, setError, isLoading, onSubmit, errors } 	= useResetPassword();

	// const config = [
	// 	{
	// 		labelText: 'Email address',
	// 		labelId: 'email',
	// 		type: 'email',
	// 		onChange,
	// 		value: email,
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
