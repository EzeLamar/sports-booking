import React, { useState } from 'react';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import {
	DATETIME_VALIDATOR,
	TEXT_VALIDATOR,
} from '../../utils/Form/inputValidators';

const LABELS = {
	FORM_TITLE: 'Datos de la reserva',
	OWNER: 'Titular',
	START_TIME: 'Hora inicio',
	END_TIME: 'Hora fin',
};

export type Reservation = {
	owner: string;
	startTime: Date;
	endTime: Date;
};

type Props = {
	reservation: Reservation;
	handleSubmit: (data: Reservation) => Promise<boolean>;
	editable?: boolean;
};

export default function ReservationForm({
	reservation,
	handleSubmit,
	editable = false,
}: Props) {
	const [disabled, setDisabled] = useState<boolean>(!editable);

	return (
		<Form
			title={LABELS.FORM_TITLE}
			initialValues={reservation}
			handleSubmit={handleSubmit}
			disabled={disabled}
			setDisabled={setDisabled}
		>
			<Input
				id='reservation-owner'
				label={LABELS.OWNER}
				name='owner'
				placeholder={LABELS.OWNER}
				{...TEXT_VALIDATOR}
			/>
			<Input
				id='reservation-start-time'
				label={LABELS.START_TIME}
				name='startTime'
				placeholder={LABELS.START_TIME}
				{...DATETIME_VALIDATOR}
			/>
			<Input
				id='reservation-end-time'
				label={LABELS.END_TIME}
				name='endTime'
				placeholder={LABELS.END_TIME}
				{...DATETIME_VALIDATOR}
			/>
		</Form>
	);
}
