'use client';

import moment from 'moment';
import { Views } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import Calendar from '@/app/components/UI/Calendar/Calendar';
import {
	createReservation,
	getAllReservations,
} from '@/app/firebase/reservations/reservation';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { getCourt, getCourtRef } from '@/app/firebase/courts/courts';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import Loading from '@/app/components/UI/Loading/Loading';
import { TEvent } from '@/app/components/UI/Calendar/module';
import { Reservation } from '@/app/components/Reservations/Reservation';
import { Reservation as ReservationForm } from '@/app/components/Reservations/ReservationForm';

type Props = {
	params: { id: string };
};

export default function AdminPage({ params }: Props) {
	const [showAll, setShowAll] = useState(false);
	const [reservations, setReservations] = useState<Array<TEvent>>([]);
	const [court, setCourt] = useState<Court | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const formatReservations = (reservationsData: Reservation[]): Array<TEvent> =>
		reservationsData.map(reservation => ({
			start: moment(reservation.startTime).toDate(),
			end: moment(reservation.endTime).toDate(),
			title: reservation.court.id,
			data: {
				id: reservation.id,
				type: 'class',
				owner: reservation.owner,
			},
		}));

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtData = await getCourt(params.id);
				const reservationsData = await getAllReservations();
				setCourt(courtData);
				setReservations(formatReservations(reservationsData));
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [params.id]);

	const handleAddReservation = async (
		data: ReservationForm
	): Promise<string> => {
		try {
			const docRef = await createReservation({
				...data,
				startTime: new Date(data.startTime),
				endTime: new Date(data.endTime),
				court: getCourtRef(params.id),
			});
			toast.success('Reserva Creada!', {
				theme: 'colored',
			});
			return docRef;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}

			throw error;
		}
	};

	const minHour = !showAll
		? moment(`2024-04-04T${court?.openHour}:00`).toDate()
		: null;
	const maxHour = !showAll
		? moment(`2024-04-04T${court?.closeHour}:00`).toDate()
		: null;

	const handleShowAll = (): void => {
		setShowAll(!showAll);
	};

	return (
		<div className='container-fluid'>
			{loading ? (
				<Loading />
			) : (
				<>
					<h2 className='text-center'>{court?.name}</h2>
					<label htmlFor='show-all'>
						<input
							type='checkbox'
							id='show-all'
							checked={showAll}
							onChange={handleShowAll}
						/>
						Mostrar Todas las horas?
					</label>
					<Calendar
						events={reservations}
						handleAddEvent={handleAddReservation}
						minHour={minHour}
						maxHour={maxHour}
						defaultView={Views.DAY}
					/>
				</>
			)}
		</div>
	);
}
