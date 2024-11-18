'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Form from '@/app/components/UI/Form/Form';
import Input from '@/app/components/UI/Input/Input';
import { z } from 'zod';
import Card from '@/app/components/UI/Card/Card';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import ButtonGroup from '@/app/components/UI/Input/ButtonGroup';
import { createCourt } from '@/app/firebase/courts/courts';

const FormSchema = z.object({
	name: z.string().min(5, { message: 'Al menos 5 caracteres' }),
	address: z.string().min(5, { message: 'Al menos 5 caracteres' }),
	availableDays: z.array(z.string()).refine(value => value.some(item => item), {
		message: 'Debe seleccionar al menos 1 dia.',
	}),
	openHour: z
		.string({
			required_error: 'Hora de apertura requerida',
		})
		.regex(/^([0-1]?[0-9]|2[0-3]):[0|3][0]$/, { message: 'Formato Inválido' }),
	closeHour: z
		.string({
			required_error: 'Hora de cierre requerida',
		})
		.regex(/^([0-1]?[0-9]|2[0-3]):[0|3][0]$/, { message: 'Formato Inválido' }),
	matchPerHour: z.coerce
		.number()
		.min(1, { message: 'Debe seleccionar un precio.' }),
	classPerHour: z.coerce
		.number()
		.min(1, { message: 'Debe seleccionar un precio.' }),
	tournamentPerHour: z.coerce
		.number()
		.min(1, { message: 'Debe seleccionar un precio.' }),
});

const LABELS = {
	TITLE: 'Nueva Cancha',
	NAME: 'Nombre',
	ADDRESS: 'Dirección',
	OPEN_DAYS: 'Días Habilitados',
	OPEN_HOUR: 'Hora Inicio',
	CLOSE_HOUR: 'Hora Cierre',
	PLACEHOLDER_HOUR: 'HH:00',
	CLASS_PRICE: 'Clase por Hora',
	MATCH_PRICE: 'Partido por Hora',
	TOURNAMENT_PRICE: 'Torneo por Hora',
	WEEKDAYS: [
		{
			id: 'monday',
			label: 'L',
		},
		{
			id: 'tuesday',
			label: 'M',
		},
		{
			id: 'wednesday',
			label: 'MM',
		},
		{
			id: 'thursday',
			label: 'J',
		},
		{
			id: 'friday',
			label: 'V',
		},
		{
			id: 'saturday',
			label: 'S',
		},
		{
			id: 'sunday',
			label: 'D',
		},
	],
};

export default function CourtCreationPage() {
	const router = useRouter();

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
		const CourtSubmitted: Court = {
			...data,
			id: '',
			isEnabled: true,
		};

		try {
			const courtd = await createCourt(CourtSubmitted);
			router.push(`/courts/${courtd}`);

			return true;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			return false;
		}
	};

	const initialValues = {
		name: '',
		address: '',
		availableDays: [],
		openHour: '',
		closeHour: '',
		matchPerHour: 0,
		classPerHour: 0,
		tournamentPerHour: 0,
	};

	return (
		<Card>
			<Form
				title='Nueva Cancha'
				initialValues={initialValues}
				handleSubmit={onSubmit}
				disabled={false}
				formSchema={FormSchema}
				showCancelButton={false}
			>
				<Input
					label={LABELS.NAME}
					type='text'
					name='name'
					placeholder={LABELS.NAME}
				/>
				<Input
					label={LABELS.ADDRESS}
					type='text'
					name='address'
					placeholder={LABELS.ADDRESS}
				/>
				<ButtonGroup
					name='availableDays'
					label={LABELS.OPEN_DAYS}
					items={LABELS.WEEKDAYS}
				/>
				<Input
					label={LABELS.OPEN_HOUR}
					type='time'
					name='openHour'
					placeholder={LABELS.PLACEHOLDER_HOUR}
				/>
				<Input
					label={LABELS.CLOSE_HOUR}
					type='time'
					name='closeHour'
					placeholder={LABELS.PLACEHOLDER_HOUR}
				/>
				<Input
					label={LABELS.MATCH_PRICE}
					type='number'
					name='matchPerHour'
					placeholder={LABELS.MATCH_PRICE}
					showCurrency
				/>
				<Input
					label={LABELS.CLASS_PRICE}
					type='number'
					name='classPerHour'
					placeholder={LABELS.CLASS_PRICE}
					showCurrency
				/>
				<Input
					label={LABELS.TOURNAMENT_PRICE}
					type='number'
					name='tournamentPerHour'
					placeholder={LABELS.TOURNAMENT_PRICE}
					showCurrency
				/>
			</Form>
		</Card>
	);
}
