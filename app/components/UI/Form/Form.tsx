import { FormEvent } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import './Form.css';

const LABELS = {
	SUBMIT: 'Guardar',
	CANCEL: 'Cancelar',
};

type Props = {
	children: React.ReactNode;
	title: string;
	initialValues: FieldValues;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	handleSubmit: (data: any) => Promise<boolean>;
	showCancelButton?: boolean;
	submitLabel?: string;
	disabled?: boolean;
	handleCancel?: () => void;
	setDisabled?: (state: boolean) => void;
};

export default function Form({
	children,
	title,
	initialValues,
	handleSubmit,
	submitLabel = LABELS.SUBMIT,
	showCancelButton = true,
	disabled = false,
	handleCancel = () => {},
	setDisabled = () => {},
}: Props) {
	const methods = useForm({
		mode: 'onChange',
		values: initialValues,
	});

	const onCancel = () => {
		methods.reset();
		setDisabled(true);
		handleCancel();
	};

	const formSubmit = methods.handleSubmit(data => {
		handleSubmit(data)
			.then(() => setDisabled(true))
			.catch(() => onCancel());
	});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formSubmit();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={e => onSubmit(e)} noValidate>
				<legend>
					{title}
					{disabled && (
						<button
							className='btn btn-outline-primary bi bi-pencil-fill'
							type='button'
							onClick={() => setDisabled(false)}
						/>
					)}
				</legend>
				<fieldset disabled={disabled}>
					{children}
					{!disabled && (
						<div className='form__buttons'>
							<input
								type='submit'
								className='btn btn-primary form__button'
								value={submitLabel}
							/>
							{showCancelButton && (
								<button
									type='button'
									className='btn btn-secondary form__button'
									onClick={onCancel}
								>
									{LABELS.CANCEL}
								</button>
							)}
						</div>
					)}
				</fieldset>
			</form>
		</FormProvider>
	);
}
