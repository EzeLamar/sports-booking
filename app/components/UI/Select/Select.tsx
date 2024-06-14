import { RegisterOptions, useFormContext } from 'react-hook-form';
import { findInputError } from '../../../utils/Form/formHelper';

export type SelectValues = {
	key: string;
	label: string;
};

type Props = {
	label: string;
	id: string;
	name: string;
	values: SelectValues[];
	validation: RegisterOptions;
};

export function SelectError({ message }: { message: string }) {
	return <p className='input__error'>{message}</p>;
}

export default function Select({ label, id, validation, name, values }: Props) {
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
			<div className='input__container'>
				<select className='form-select' {...register(name, validation)}>
					{values.map(value => (
						<option key={value.key} value={value.key}>
							{value.label}
						</option>
					))}
				</select>
			</div>
			{inputError && <SelectError message={inputError} />}
		</div>
	);
}
