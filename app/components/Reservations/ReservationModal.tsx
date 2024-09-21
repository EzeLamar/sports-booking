import ReservationDetails from '@/app/components/Reservations/ReservationDetails';
import ReservationForm, {
	InitialReservation,
	Reservation,
	TYPE_VALUES,
} from '@/app/components/Reservations/ReservationForm';
import Drawer from '@/app/components/UI/Modal/Drawer';
import { Button } from '@/components/ui/button';
import React from 'react';

const LABELS = {
	SHOW_RESERVATION: 'Reserva',
	NEW_RESERVATION: 'Nueva Reserva',
};

type Props = {
	show: boolean;
	reservation: InitialReservation;
	handleClose: () => void;
	handleSubmit: (data: Reservation, ocurrences: number) => Promise<boolean>;
	handleDelete: (id: string) => Promise<boolean>;
	handleCancel: () => void;
	minDate?: Date | null;
	maxDate?: Date | null;
	editable?: boolean;
	setEditable?: (state: boolean) => void;
};

export default function ReservationModal({
	show,
	reservation,
	handleSubmit,
	handleClose,
	handleDelete,
	handleCancel = () => {},
	editable = false,
	minDate = null,
	maxDate = null,
	setEditable = () => {},
}: Props) {
	const getTime = (date: Date | null): string | null => {
		if (!date) {
			return null;
		}

		return `${date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
	};

	const rangeTime = `${reservation.startTime?.toLocaleDateString()} ${getTime(reservation.startTime)} - ${getTime(reservation.endTime)} hs`;

	const typeColors = {
		lesson: 'bg-blue-300 dark:bg-blue-900',
		tournament: 'bg-orange-300 dark:bg-yellow-800',
		match: 'bg-violet-300 dark:bg-violet-800',
	};

	const typeColorSelected = (type: string) => {
		if (type === 'lesson') {
			return typeColors.lesson;
		}
		if (type === 'match') {
			return typeColors.match;
		}
		if (type === 'tournament') {
			return typeColors.tournament;
		}

		return '';
	};

	return (
		<Drawer
			show={show}
			title={
				!reservation.id
					? LABELS.NEW_RESERVATION
					: TYPE_VALUES.find(x => x.value === reservation.type)?.label
			}
			onClose={() => handleClose()}
			description={!reservation.id ? rangeTime : null}
			className={`${typeColorSelected(reservation.type ?? '')} ${!reservation.id && 'min-h-[70vh]'}`}
		>
			{editable ? (
				<ReservationForm
					reservation={reservation}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
					handleDelete={handleDelete}
					editable={editable}
					minDate={minDate}
					maxDate={maxDate}
					showTitle={false}
				/>
			) : (
				<div>
					<ReservationDetails reservation={reservation} rangeTime={rangeTime} />
					<Button
						className='w-full px-4 mt-3'
						variant='outline'
						onClick={() => setEditable(true)}
					>
						Editar
					</Button>
				</div>
			)}
		</Drawer>
	);
}
