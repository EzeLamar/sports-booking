'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';
import Form from '@/app/(my-app)/components/UI/Form/Form';
import Input from '@/app/(my-app)/components/UI/Input/Input';
import { z } from 'zod';
import { createClient } from '@/app/(my-app)/firebase/clients/client';
import { Client } from '@/app/(my-app)/firebase/clients/model';
import Card from '@/app/(my-app)/components/UI/Card/Card';

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
	FIRSTNAME: 'Nombre',
	LASTNAME: 'Apellido',
	EMAIL: 'Correo',
	PHONE: 'Celular',
};

export default function ClientCreationPage() {
	const router = useRouter();

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
		const clientSubmitted: Client = {
			id: '',
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
		};

		try {
			const clientd = await createClient(clientSubmitted);
			router.push(`/clients/${clientd}`);

			return true;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			return false;
		}
	};

	const initialValues = {
		firstName: '',
		lastName: '',
		email: null,
		phone: null,
	};

	return (
		<Card>
			<Form
				title='Nuevo Cliente'
				initialValues={initialValues}
				handleSubmit={onSubmit}
				disabled={false}
				formSchema={FormSchema}
				showCancelButton={false}
			>
				<Input
					type='text'
					label={LABELS.FIRSTNAME}
					name='firstName'
					placeholder={LABELS.FIRSTNAME}
				/>
				<Input
					type='text'
					label={LABELS.LASTNAME}
					name='lastName'
					placeholder={LABELS.LASTNAME}
				/>
				<Input
					type='text'
					label={LABELS.PHONE}
					name='phone'
					placeholder={LABELS.PHONE}
				/>
				<Input
					type='text'
					label={LABELS.EMAIL}
					name='email'
					placeholder={LABELS.EMAIL}
				/>
			</Form>
		</Card>
	);
}
