import { RegisterOptions, useFormContext } from 'react-hook-form';
import { findInputError } from '../../../utils/Form/formHelper';
import './Input.css';

type Props = {
	label: string;
	type: string;
	id: string;
	placeholder: string;
	name: string;
	validation: RegisterOptions;
	showCurrency?: boolean;
	min?: string | undefined;
	max?: string | undefined;
};

export function InputError({ message }: { message: string }) {
	return <p className='input__error'>{message}</p>;
}

export default function Input({
	label,
	type,
	id,
	placeholder,
	validation,
	name,
	showCurrency = false,
	min = undefined,
	max = undefined,
}: Props) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const inputError = findInputError(errors, name);

	return (
		<div className='mb-3'>
			<label htmlFor={id} className='form-label'>
				{label}
			</label>
			<div className='input-group input__container'>
				{showCurrency && <span className='input-group-text'>$</span>}
				<input
					id={id}
					type={type}
					className='form-control'
					placeholder={placeholder}
					min={min}
					max={max}
					{...register(name, validation)}
				/>
			</div>
			{inputError && <InputError message={inputError} />}
		</div>
	);
}
