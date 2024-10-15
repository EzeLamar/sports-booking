/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
	ReservationStatus,
	ReservationType,
} from '@/app/firebase/reservations/model';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Input from '@/app/components/UI/Input/Input';
import Form from '@/app/components/UI/Form/Form';
import Select from '@/app/components/UI/Select/Select';
import SelectLinked from '@/app/components/UI/Select/SelectLinked';
import { CourtContext } from '@/app/context/CourtContext';
import { ClientsContext } from '@/app/context/ClientsContext';
import ComboBox from '@/app/components/UI/Input/ComboBox';
import { useRouter } from 'next/navigation';

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
	REGULAR_BOOKING: 'Turno Fijo (Replicar X semanas)',
};

export const STATUS_VALUES = [
	{
		value: ReservationStatus.Booked,
		label: 'Reservado',
	},
	{
		value: ReservationStatus.Paid,
		label: 'Pagado',
	},
	{
		value: ReservationStatus.Canceled,
		label: 'Cancelado',
	},
];

export const TYPE_VALUES = [
	{
		value: ReservationType.Match,
		label: `Partido`,
	},
	{
		value: ReservationType.Lesson,
		label: `Clase`,
	},
	{
		value: ReservationType.Tournament,
		label: `Torneo`,
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
	handleCancel: () => void;
	minDate?: Date | null;
	maxDate?: Date | null;
	editable?: boolean;
	showTitle?: boolean;
};

const FormSchema = z
	.object({
		id: z.string().nullable(),
		ocurrences: z.coerce
			.number()
			.min(1, { message: 'Debe definir el número de ocurrencias.' })
			.max(10, { message: 'El maximo es 10.' }),
		owner: z.string().min(2, {
			message: 'El nombre de la reserva debe tener al menos 2 caracteres.',
		}),
		type: z.nativeEnum(ReservationType),
		startTime: z.string().min(1, {
			message: 'Debe seleccionar una hora de inicio.',
		}),
		endTime: z.string().min(1, {
			message: 'Debe seleccionar una hora de fin.',
		}),
		price: z.coerce.number().min(1, { message: 'Debe seleccionar un precio.' }),
		status: z.nativeEnum(ReservationStatus),
	})
	.refine(data => data.startTime < data.endTime, {
		message: 'La hora de inicio debe ser anterior a la hora de fin.',
		path: ['endTime'], // path of error
	});

export default function ReservationForm({
	reservation,
	handleSubmit,
	handleCancel = () => {},
	editable = false,
	minDate = null,
	maxDate = null,
	showTitle = true,
}: Props) {
	const router = useRouter();
	const [disabled, setDisabled] = useState<boolean>(!editable);
	const [isRegularBooking, setIsRegularBooking] = useState<boolean>(false);
	const court = useContext(CourtContext);
	const clients = useContext(ClientsContext);
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

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
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

	const TYPE_VALUES_BY_PRICE = [
		{
			value: ReservationType.Match,
			label: `Partido - ($${court?.matchPerHour} x hora)`,
		},
		{
			value: ReservationType.Lesson,
			label: `Clase - ($${court?.classPerHour} x hora)`,
		},
		{
			value: ReservationType.Tournament,
			label: `Torneo - ($${court?.tournamentPerHour} x hora)`,
		},
	];

	const handlePriceValueByType = (type: string) => {
		if (!court || !reservation.endTime || !reservation.startTime) {
			return undefined;
		}
		const startTime = moment(reservation.startTime);
		const endTime = moment(reservation.endTime);
		const reservedHours = endTime.diff(startTime, 'minutes') / 60;
		let newValue;

		switch (type) {
			case ReservationType.Lesson:
				newValue = court.classPerHour * reservedHours;
				break;
			case ReservationType.Match:
				newValue = court.matchPerHour * reservedHours;
				break;
			case ReservationType.Tournament:
				newValue = court.tournamentPerHour * reservedHours;
				break;
			default:
				newValue = 0;
		}

		return {
			name: 'price',
			value: newValue,
		};
	};

	const clientsByName = clients.map(client => ({
		label: `${client.firstName} ${client.lastName}`,
		value: client.id,
	}));

	return (
		<Form
			title={showTitle ? LABELS.FORM_TITLE : null}
			initialValues={initialValues}
			handleSubmit={onSubmit}
			handleCancel={handleCancel}
			disabled={disabled}
			setDisabled={setDisabled}
			formSchema={FormSchema}
		>
			{!initialValues.id && (
				<div className='flex justify-between gap-2'>
					<div className='flex items-center gap-2'>
						<Switch
							id='airplane-mode'
							onClick={() => setIsRegularBooking(!isRegularBooking)}
						/>
						<Label htmlFor='airplane-mode'>{LABELS.REGULAR_BOOKING}</Label>
					</div>
					{isRegularBooking && (
						<Input
							type='number'
							placeholder={LABELS.OCURRENCES}
							name='ocurrences'
						/>
					)}
				</div>
			)}
			<ComboBox
				name='owner'
				options={clientsByName}
				label={LABELS.OWNER}
				searchable
				handleSearchNotFound={() => router.push('/clients/new')}
			/>
			<SelectLinked
				name='type'
				label={LABELS.TYPE}
				options={TYPE_VALUES_BY_PRICE}
				handleUpdateLinkedInput={handlePriceValueByType}
			/>
			{reservation.id && (
				<>
					<Input
						type='datetime-local'
						label={LABELS.START_TIME}
						name='startTime'
						placeholder={LABELS.START_TIME}
						min={min}
						max={max}
					/>
					<Input
						type='datetime-local'
						label={LABELS.END_TIME}
						name='endTime'
						placeholder={LABELS.END_TIME}
						min={min}
						max={max}
					/>
				</>
			)}
			<Input
				type='number'
				label={LABELS.PRICE}
				name='price'
				placeholder={LABELS.PRICE}
				showCurrency
			/>
			<Select name='status' label={LABELS.STATUS} options={STATUS_VALUES} />
		</Form>
	);
}
