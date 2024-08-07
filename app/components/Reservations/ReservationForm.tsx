/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
	ReservationStatus,
	ReservationType,
} from '../../firebase/reservations/model';
import hasErrorMessage from '../../utils/Error/ErrorHelper';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import {
	DATETIME_VALIDATOR,
	NUMBER_VALIDATOR,
	PRICE_VALIDATOR,
	STATUS_VALIDATOR,
	TEXT_VALIDATOR,
	TYPE_VALIDATOR,
} from '../../utils/Form/inputValidators';
import Select from '../UI/Select/Select';

const LABELS = {
	FORM_TITLE: 'Datos de la reserva',
	OWNER: 'Titular',
	TYPE: 'Tipo',
	OCURRENCES: 'Replicar',
	PRICE: 'Precio',
	STATUS: 'Estado',
	START_TIME: 'Hora inicio',
	END_TIME: 'Hora fin',
	DELETE: 'Borrar',
	REGULAR_BOOKING: 'Turno Fijo',
};

const TYPE_VALUES = [
	{
		key: ReservationType.Match,
		label: 'Partido',
	},
	{
		key: ReservationType.Lesson,
		label: 'Clase',
	},
	{
		key: ReservationType.Tournament,
		label: 'Torneo',
	},
];

const STATUS_VALUES = [
	{
		key: ReservationStatus.Booked,
		label: 'Reservado',
	},
	{
		key: ReservationStatus.Paid,
		label: 'Pagado',
	},
	{
		key: ReservationStatus.Canceled,
		label: 'Cancelado',
	},
];

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const MIN_DATE_FORMAT = 'YYYY-MM-DDT00:00';
const MAX_DATE_FORMAT = 'YYYY-MM-DDT23:00';
const SINGLE_OCURRENCE = 1;

export type Reservation = {
	id: string | null;
	owner: string;
	type: ReservationType;
	startTime: Date;
	endTime: Date;
	price: number;
	status: ReservationStatus;
};

export type InitialReservation = {
	id: string | null;
	owner: string;
	type: ReservationType | null;
	startTime: Date | null;
	endTime: Date | null;
	price: number | null;
	status: ReservationStatus | null;
};

type Props = {
	reservation: InitialReservation;
	handleSubmit: (data: Reservation, ocurrences: number) => Promise<boolean>;
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
	const [isRegularBooking, setIsRegularBooking] = useState<boolean>(false);
	const min = minDate ? moment(minDate).format(MIN_DATE_FORMAT) : undefined;
	const max = maxDate ? moment(maxDate).format(MAX_DATE_FORMAT) : undefined;
	const initialValues = {
		id: reservation.id,
		owner: reservation.owner,
		type: reservation.type,
		startTime: reservation.startTime
			? moment(reservation.startTime).format(DATE_TIME_FORMAT)
			: null,
		endTime: reservation.endTime
			? moment(reservation.endTime).format(DATE_TIME_FORMAT)
			: null,
		price: reservation.price,
		status: reservation.status,
		ocurrences: SINGLE_OCURRENCE,
	};

	const onSubmit = async (data: FieldValues): Promise<boolean> => {
		const reservationSubmitted = {
			id: data.id,
			owner: data.owner,
			type: data.type,
			startTime: new Date(data.startTime),
			endTime: new Date(data.endTime),
			price: data.price,
			status: data.status,
		};

		try {
			return await handleSubmit(
				reservationSubmitted,
				isRegularBooking ? data.ocurrences : SINGLE_OCURRENCE
			);
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
					{LABELS.DELETE}
				</button>
			)}
			{!initialValues.id && (
				<div className='form-check form-switch'>
					<input
						className='form-check-input'
						type='checkbox'
						role='switch'
						id='switch-regular-booking'
						checked={isRegularBooking}
						onChange={() => setIsRegularBooking(!isRegularBooking)}
					/>
					<label className='form-check-label' htmlFor='switch-regular-booking'>
						{LABELS.REGULAR_BOOKING}
					</label>
				</div>
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
				<Select
					id='reservation-type'
					label={LABELS.TYPE}
					name='type'
					values={TYPE_VALUES}
					{...TYPE_VALIDATOR}
				/>
				{isRegularBooking && (
					<Input
						id='reservation-ocurrences'
						label={LABELS.OCURRENCES}
						placeholder={LABELS.OCURRENCES}
						name='ocurrences'
						{...NUMBER_VALIDATOR}
					/>
				)}
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
				<Input
					id='reservation-price'
					label={LABELS.PRICE}
					name='price'
					placeholder={LABELS.PRICE}
					{...PRICE_VALIDATOR}
				/>
				<Select
					id='reservation-status'
					label={LABELS.STATUS}
					name='status'
					values={STATUS_VALUES}
					{...STATUS_VALIDATOR}
				/>
			</Form>
		</>
	);
}
