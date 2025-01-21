/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { z } from 'zod';
import Card from '@/app/(my-app)/components/UI/Card/Card';
import Form from '@/app/(my-app)/components/UI/Form/Form';
import Input from '@/app/(my-app)/components/UI/Input/Input';
import ButtonGroup from '@/app/(my-app)/components/UI/Input/ButtonGroup';

export type Court = {
	id: string;
	isEnabled: boolean;
	name: string;
	address: string;
	availableDays: string[];
	openHour: string;
	closeHour: string;
	matchPerHour: number;
	tournamentPerHour: number;
	classPerHour: number;
};

type Props = {
	handleSubmit: (data: Court) => Promise<boolean>;
	court?: Court | null;
	editable?: boolean;
};

const LABELS = {
	TITLE: 'Configuración de Cancha',
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

export default function CourtSettings({
	court = null,
	editable = false,
	handleSubmit,
}: Props) {
	const [disabled, setDisabled] = useState<boolean>(!editable);
	const formValues = { ...court };

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
		const courtSubmitted: Court = {
			...data,
			id: court?.id ?? '',
			isEnabled: false,
		};

		try {
			return await handleSubmit(courtSubmitted);
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
