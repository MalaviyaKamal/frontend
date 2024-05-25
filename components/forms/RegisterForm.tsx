'use client';

import { useRegister } from '@/hooks';
import { Input } from '@/components/forms';
import { Spinner } from '@/components/common';
import { Button } from "@/components/ui/button";

function RegisterForm() {
  const { register, watch, isLoading, onSubmit, errors } = useRegister();

  function valPass(value: string) {
	let password1 =  watch('password');
	console.log('value', value);
	console.log('watch', password1);
	console.log('value != watch', value == password1);
	return value == watch('password') || 'The passwords do not match';
  }

  return (
    <form noValidate className='space-y-6' onSubmit={onSubmit}>
      <Input
        key="first_name"
        labelId="first_name"
        type="text"
        required={true}
        register={register}
        validation={{ required: 'First name is required' }}
        error={errors.first_name}
      >
        First Name
      </Input>
      <Input
        key="last_name"
        labelId="last_name"
        type="text"
        required={true}
        register={register}
        validation={{ required: 'Last name is required' }}
        error={errors.last_name}
      >
        Last Name
      </Input>
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
        error={errors.email}
      >
        Email Address
      </Input>
      <Input
        key="password"
        labelId="password"
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
        error={errors.password}
      >
        Password
      </Input>
      <Input
        key="re_password"
        labelId="re_password"
        type="password"
        required={true}
        register={register}
        validation={{
          required: 'Password confirmation is required',
          validate: valPass,
        }}
        error={errors.re_password}
      >
        Confirm Password
      </Input>
      <div>
        <Button
          type='submit'
          className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
          disabled={isLoading}
        >
          {isLoading ? <Spinner sm /> : `Sign Up`}
        </Button>
      </div>
      {errors.root && (
        <span className="text-xs text-red-600">{errors.root.message}</span>
      )}
    </form>
  );
}

export default RegisterForm;