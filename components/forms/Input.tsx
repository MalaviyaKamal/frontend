import { ChangeEvent } from 'react';
import Link from 'next/link';
import { FieldError,RegisterOptions,  UseFormRegister , FieldValues, Path} from 'react-hook-form';


interface Props<T extends FieldValues> {
	labelId: string;
	type: string;
	children: React.ReactNode;
	register: UseFormRegister<T>;
	validation?:  RegisterOptions
	link?: {
		linkText: string;
		linkUrl: string;
	};
	error: FieldError | undefined;

	required?: boolean;
}

export default function Input<T extends FieldValues>({
	labelId,
	type,
	children,
	link,
	error,
	register,
	validation,
	required = false,
}: Props<T>) {
	return (
		<div>
			<div className='flex justify-between align-center'>
				<label
					htmlFor={labelId}
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					{children}
				</label>
				{link && (
					<div className='text-sm'>
						<Link
							className='font-semibold text-indigo-600 hover:text-indigo-500'
							href={link.linkUrl}
						>
							{link.linkText}
						</Link>
					</div>
				)}
			</div>
			<div className='mt-2'>
				<input
					{...register(labelId as Path<T>, validation)}
					id={labelId}
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					name={labelId}
					type={type}
				/>
			</div>
			{error && (
				(
					error.message?.split("||").map((message: string, index: number) => (
					<div>	<span key={index} className="text-xs text-red-600">{message}</span></div>
					))
				)
            )}
		</div>
	);
}
