import { ChangeEvent, FormEvent } from 'react';
import { Input as FormInput } from '@/components/forms';
import { Spinner } from '@/components/common';

// components/forms/Input.tsx

interface InputProps {
	labelId: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Define onChange prop
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
	children?: React.ReactNode; // Add children property
}

const Input: React.FC<InputProps> = ({
  labelId,
  type,
  onChange,
  value,
  link,
  required,
  children,
}) => {
  return (
    <div>
      <label htmlFor={labelId}>{children}</label>
      <input
        type={type}
        id={labelId}
        value={value}
        onChange={onChange} // Use the provided onChange prop
        required={required}
      />
      {link && (
        <a href={link.linkUrl} target="_blank" rel="noopener noreferrer">
          {link.linkText}
        </a>
      )}
    </div>
  );
};

export default Input;
