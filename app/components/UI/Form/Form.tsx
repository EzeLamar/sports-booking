'use client';

import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import './Form.css';

const LABELS = {
	SUBMIT: 'Guardar',
	CANCEL: 'Cancelar',
};

type Props = {
	children: React.ReactNode;
	initialValues: FieldValues;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	handleSubmit: (data: any) => Promise<boolean>;
	title?: string | null;
	showCancelButton?: boolean;
	submitLabel?: string;
	disabled?: boolean;
	handleCancel?: () => void;
	setDisabled?: (state: boolean) => void;
};

export default function Form({
	children,
	initialValues,
	handleSubmit,
	title = null,
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
	const { isSubmitting } = methods.formState;

	const onCancel = () => {
		methods.reset();
		setDisabled(true);
		handleCancel();
	};

	function onSubmit(data: FieldValues) {
		return handleSubmit(data)
			.then(() => setDisabled(true))
			.catch(() => onCancel());
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
				<fieldset disabled={disabled || isSubmitting}>
					{children}
					{!disabled && (
						<div className='d-flex flex-start'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='btn btn-primary form__button'
								value={submitLabel}
							>
								{isSubmitting && (
									<span className='spinner-border spinner-border-sm me-1' />
								)}
								{submitLabel}
							</button>
							{showCancelButton && (
								<button
									disabled={isSubmitting}
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
