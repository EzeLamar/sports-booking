import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import moment from 'moment';
import { toast } from 'react-toastify';
import hasErrorMessage from '../../utils/Error/ErrorHelper';
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
const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const MIN_DATE_FORMAT = 'YYYY-MM-DDT00:00';
const MAX_DATE_FORMAT = 'YYYY-MM-DDT23:00';

export type Reservation = {
	id: string | null;
	owner: string;
	startTime: Date;
	endTime: Date;
};

export type InitialReservation = {
	id: string | null;
	owner: string;
	startTime: Date | null;
	endTime: Date | null;
};

type Props = {
	reservation: InitialReservation;
	handleSubmit: (data: Reservation) => Promise<boolean>;
	handleDelete: (id: string) => Promise<boolean>;
	handleCancel: () => void;
	minDate?: Date | null;
	maxDate?: Date | null;
	editable?: boolean;
	showTitle?: boolean;
};

export default function ReservationForm({
	reservation,
	handleSubmit,
	handleCancel = () => {},
	handleDelete,
	editable = false,
	minDate = null,
	maxDate = null,
	showTitle = true,
}: Props) {
	const [disabled, setDisabled] = useState<boolean>(!editable);
	const min = minDate ? moment(minDate).format(MIN_DATE_FORMAT) : undefined;
	const max = maxDate ? moment(maxDate).format(MAX_DATE_FORMAT) : undefined;
	const initialValues = {
		id: reservation.id,
		owner: reservation.owner,
		startTime: reservation.startTime
			? moment(reservation.startTime).format(DATE_TIME_FORMAT)
			: null,
		endTime: reservation.endTime
			? moment(reservation.endTime).format(DATE_TIME_FORMAT)
			: null,
	};

	const onSubmit = async (data: FieldValues): Promise<boolean> => {
		const reservationSubmitted = {
			id: data.id,
			owner: data.owner,
			startTime: new Date(data.startTime),
			endTime: new Date(data.endTime),
		};

		try {
			return await handleSubmit(reservationSubmitted);
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			return false;
		}
	};

	const onDelete = async (id: string): Promise<boolean> => {
		try {
			return await handleDelete(id);
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			return false;
		}
	};

	const endHourValidation = (endTime: string, formValues: FieldValues) => {
		if (endTime === formValues.startTime) {
			return 'Fecha y hora igual a la de inicio';
		}

		if (endTime < formValues.startTime) {
			return 'Fecha y hora anterior a la de inicio';
		}

		return true;
	};

	return (
		<>
			{initialValues.id && (
				<button
					className='position-absolute top-0 end-0 mt-3 me-3 p-2 btn btn-danger bi bi-trash-fill'
					type='button'
					onClick={() => onDelete(initialValues.id ?? '')}
				>
					Borrar
				</button>
			)}
			<Form
				title={showTitle ? LABELS.FORM_TITLE : null}
				initialValues={initialValues}
				handleSubmit={onSubmit}
				handleCancel={handleCancel}
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
					min={min}
					max={max}
					{...DATETIME_VALIDATOR}
				/>
				<Input
					id='reservation-end-time'
					label={LABELS.END_TIME}
					name='endTime'
					placeholder={LABELS.END_TIME}
					min={min}
					max={max}
					type={DATETIME_VALIDATOR.type}
					validation={{
						...DATETIME_VALIDATOR.validation,
						validate: {
							endGreaterThanStart: endHourValidation,
						},
					}}
				/>
			</Form>
		</>
	);
}
