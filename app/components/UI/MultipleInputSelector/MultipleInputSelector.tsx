import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import '../MultipleOptionsSelector/MultipleOptionsSelector.css';
import '../MultipleOptionsSelector/MultipleOptionBadge.css';
import { findInputError, isFormInvalid } from '../../../utils/Form/formHelper';
import { InputError } from '../Input/Input';

type Props = {
	id: string;
	label: string;
	name: string;
	options: string[];
	validation: RegisterOptions;
};

export default function MultipleInputSelector({
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
	const isInvalid = isFormInvalid(inputError);

	return (
		<div className='mb-3'>
			<label htmlFor='label' className='form-label'>
				{label}
			</label>
			<div className='multiple-options-selector__container'>
				{options.map((option, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<div key={index}>
						<input
							type='checkbox'
							className='btn-check'
							id={`${id}-${index}`}
							autoComplete='off'
							value={option}
							{...register(name, validation)}
						/>
						<label
							className='multiple-option-badge__container btn btn-outline-primary'
							htmlFor={`${id}-${index}`}
						>
							{option}
						</label>
					</div>
				))}
			</div>
			{isInvalid && <InputError message={inputError.error.message} />}
		</div>
	);
}
