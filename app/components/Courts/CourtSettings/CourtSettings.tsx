/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import {
	TEXT_VALIDATOR,
	HOUR_VALIDATOR,
	PRICE_VALIDATOR,
	CHECKBOX_VALIDATOR,
} from '../../../utils/Form/inputValidators';
import Card from '../../UI/Card/Card';
import MultipleInputSelector from '../../UI/MultipleInputSelector/MultipleInputSelector';

export type Court = {
	isEnabled: boolean;
	name: string;
	address: string;
	availableDays: string[];
	pricePerHour: string;
	openHour: string;
	closeHour: string;
};

type Props = {
	court: Court | null;
	handleSubmit: (data: Court) => Promise<boolean>;
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
	PRICE: 'Precio por Hora',
	WEEKDAYS: [
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
		'Domingo',
	],
};

export default function CourtSettings({
	court = null,
	editable = false,
	handleSubmit,
}: Props) {
	const [disabled, setDisabled] = useState<boolean>(!editable);
	const formValues = { ...court };

	return (
		<Card>
			<Form
				title={LABELS.TITLE}
				disabled={disabled}
				setDisabled={setDisabled}
				initialValues={formValues}
				handleSubmit={handleSubmit}
			>
				<Input
					id='court-settings-name'
					label={LABELS.NAME}
					name='name'
					placeholder={LABELS.NAME}
					{...TEXT_VALIDATOR}
				/>
				<Input
					id='court-settings-address'
					label={LABELS.ADDRESS}
					name='address'
					placeholder={LABELS.ADDRESS}
					{...TEXT_VALIDATOR}
				/>
				<MultipleInputSelector
					id='court-settings-available-days'
					label={LABELS.OPEN_DAYS}
					name='availableDays'
					options={LABELS.WEEKDAYS}
					{...CHECKBOX_VALIDATOR}
				/>
				<Input
					id='court-settings-open-hour'
					label={LABELS.OPEN_HOUR}
					name='openHour'
					placeholder={LABELS.PLACEHOLDER_HOUR}
					{...HOUR_VALIDATOR}
				/>
				<Input
					id='court-settings-close-hour'
					label={LABELS.CLOSE_HOUR}
					name='closeHour'
					placeholder={LABELS.PLACEHOLDER_HOUR}
					{...HOUR_VALIDATOR}
				/>
				<Input
					id='court-settings-price'
					label={LABELS.PRICE}
					name='pricePerHour'
					placeholder={LABELS.PRICE}
					{...PRICE_VALIDATOR}
				/>
			</Form>
		</Card>
	);
}
