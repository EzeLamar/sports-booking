import { RegisterOptions, useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../../../utils/Form/formHelper';
import './Input.css';

type Props = {
	label: string;
	type: string;
	id: string;
	placeholder: string;
	name: string;
	validation: RegisterOptions;
	showCurrency?: boolean;
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
}: Props) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const inputError = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);

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
					{...register(name, validation)}
				/>
			</div>
			{isInvalid && <InputError message={inputError.error.message} />}
		</div>
	);
}
