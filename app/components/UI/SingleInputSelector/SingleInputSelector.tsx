import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { findInputError } from '../../../utils/Form/formHelper';
import { InputError } from '../Input/Input';
import './SingleInputSelector.css';

type Props = {
	id: string;
	label: string;
	name: string;
	options: string[];
	validation: RegisterOptions;
};

export default function SingleInputSelector({
	id,
	label,
	name,
	options,
	validation,
}: Props) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, name);

	return (
		<div className='mb-3'>
			<label htmlFor='label' className='form-label'>
				{label}
			</label>
			<div className='single-input-selector__container'>
				{options.map((option, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<span key={index}>
						<input
							type='radio'
							className='btn-check'
							id={`${id}-${index}`}
							autoComplete='off'
							value={option}
							{...register(name, validation)}
						/>
						<label
							className='single-input-badge__container btn btn-outline-primary'
							htmlFor={`${id}-${index}`}
						>
							{option}
						</label>
					</span>
				))}
			</div>
			{inputError && <InputError message={inputError} />}
		</div>
	);
}
