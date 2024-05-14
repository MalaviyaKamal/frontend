
'use client';

import { useResetPasswordConfirm } from '@/hooks';
import { Form, Input } from '@/components/forms';
import { Spinner } from '@/components/common';

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const { register,setError,watch, isLoading, onSubmit, errors } =
    useResetPasswordConfirm(uid, token);
	
	function valPass(value: string) {
		const password1 = watch('new_password');
		const password2 = watch('re_new_password');
		if (password1 && password2) {
			return password1 === password2 || 'The passwords do not match';
		}

		return true; 
	}

  return (
    <form noValidate className='space-y-6' onSubmit={onSubmit}>
	  <Input
				key="new_password"
				labelId="new_password"
				type="password"
				required={true}
				register={register}
				validation={{
					required: 'Password is required',
					minLength: {
					  value: 8,
					  message: 'Password must be at least 8 characters',
					},
				  }}
				error={errors.new_password}>
				New Password
			</Input>
    
	  <Input
				key="Password"
				labelId="re_new_password"
				type="password"
				required={true}
				register={register}
				validation={{
					required: 'Password confirmation is required',
					validate: valPass,
				  }}
				error={errors.re_new_password}>
				Confirm New Password
			</Input>
      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          disabled={isLoading}
        >
          {isLoading ? <Spinner sm /> : `Reset Password`}
        </button>
      </div>

      {errors.root && (
        <span className="text-xs text-red-600">{errors.root.message}</span>
      )}
    </form>
  );
}
