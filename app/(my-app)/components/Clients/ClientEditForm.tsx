/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { z } from 'zod';
import Card from '@/app/(my-app)/components/UI/Card/Card';
import Form from '@/app/(my-app)/components/UI/Form/Form';
import Input from '@/app/(my-app)/components/UI/Input/Input';
import { Client } from '@/app/(my-app)/firebase/clients/model';
import { updateClient } from '@/app/(my-app)/firebase/clients/client';

type Props = {
	client?: Client | null;
	editable?: boolean;
};

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres.',
	}),
	lastName: z.string().min(2, {
		message: 'El apellido debe tener al menos 2 caracteres.',
	}),
	email: z
		.string()
		.email({
			message: 'El correo debe ser valido.',
		})
		.nullable(),
	phone: z
		.string()
		.min(10, {
			message: 'El celular debe tener al menos 10 caracteres.',
		})
		.nullable(),
});

const LABELS = {
	TITLE: 'Editar cliente',
	FIRSTNAME: 'Nombre',
	LASTNAME: 'Apellido',
	EMAIL: 'Correo',
	PHONE: 'Celular',
	SUBMIT: 'Guardar',
};

export default function ClientEditForm({ client, editable = false }: Props) {
	const [disabled, setDisabled] = useState<boolean>(!editable);
	const formValues = { ...client };

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
		const clientSubmitted: Client = {
			...data,
			id: client?.id ?? '',
		};

		try {
			const response = await updateClient(clientSubmitted);
			toast.success('Cliente Actualizado!', { theme: 'colored' });
			return response;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			return false;
		}
	};

	return (
		<Card>
			<Form
				title={LABELS.TITLE}
				disabled={disabled}
				setDisabled={setDisabled}
				initialValues={formValues}
				handleSubmit={onSubmit}
				formSchema={FormSchema}
			>
				<Input
					label={LABELS.FIRSTNAME}
					type='text'
					name='firstName'
					placeholder={LABELS.FIRSTNAME}
				/>
				<Input
					label={LABELS.LASTNAME}
					type='text'
					name='lastName'
					placeholder={LABELS.LASTNAME}
				/>
				<Input
					label={LABELS.EMAIL}
					type='text'
					name='email'
					placeholder={LABELS.EMAIL}
				/>
				<Input
					label={LABELS.PHONE}
					type='text'
					name='phone'
					placeholder={LABELS.PHONE}
				/>
			</Form>
		</Card>
	);
}
