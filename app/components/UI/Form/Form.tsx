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
	handleSubmit: (data: unknown) => void;
	handleCancel: () => void;
	disabled?: boolean;
	setDisabled?: (state: boolean) => void;
};

export default function Form({
	children,
	title,
	initialValues,
	setDisabled = () => {},
	handleSubmit,
	handleCancel,
	disabled = false,
}: Props) {
	const methods = useForm({
		mode: 'onChange',
		values: initialValues,
	});

	const formSubmit = methods.handleSubmit(data => {
		handleSubmit(data);
	});

	const onCancel = () => {
		methods.reset();
		setDisabled(true);
		handleCancel();
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formSubmit();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={e => onSubmit(e)} noValidate>
				<fieldset disabled={disabled}>
					<legend>
						{title}
						{disabled && (
							<button type='button' onClick={() => setDisabled(false)}>
								Editar
							</button>
						)}
					</legend>
					{children}
					{!disabled && (
						<div className='form__buttons'>
							<input
								type='submit'
								className='btn btn-primary form__button'
								value={LABELS.SUBMIT}
							/>
							<button
								type='button'
								className='btn btn-secondary form__button'
								onClick={onCancel}
							>
								{LABELS.CANCEL}
							</button>
						</div>
					)}
				</fieldset>
			</form>
		</FormProvider>
	);
}
