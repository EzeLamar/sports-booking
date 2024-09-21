'use client';

import moment from 'moment';
import { View, Views } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import {
	createReservation,
	deleteReservation,
	updateReservation,
	getAllReservationsByCourtId,
	createRegularReservation,
} from '@/app/firebase/reservations/reservation';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { getCourt, getCourtRef } from '@/app/firebase/courts/courts';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import Loading from '@/app/components/UI/Loading/Loading';
import { TEvent } from '@/app/components/UI/Calendar/model';
import { Reservation as ReservationForm } from '@/app/components/Reservations/ReservationForm';
import { Reservation } from '@/app/firebase/reservations/model';
import Calendar from '@/app/components/UI/Calendar/Calendar';
import { CourtContext } from '@/app/context/CourtContext';
import CalendarToolbar from '@/app/components/UI/Calendar/CalendarToolbar/CalendarToolbar';

type Props = {
	params: { id: string };
};

export default function AdminPage({ params }: Props) {
	const [showAll, setShowAll] = useState(false);
	const [reservations, setReservations] = useState<Array<TEvent>>([]);
	const [court, setCourt] = useState<Court | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentView, setCurrentView] = useState<View>(Views.MONTH);
	const [currentDay, setCurrentDay] = useState<Date>(new Date());

	const reservationsToEvents = (reservationsData: Reservation[]): TEvent[] =>
		reservationsData.map(reservation => ({
			start: moment(reservation.startTime).toDate(),
			end: moment(reservation.endTime).toDate(),
			title: reservation.court.id,
			data: {
				id: reservation.id,
				type: reservation.type,
				owner: reservation.owner,
				price: reservation.price,
				status: reservation.status,
			},
		}));

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtData = await getCourt(params.id);
				const reservationsData = await getAllReservationsByCourtId(params.id);
				setCourt(courtData);
				setReservations(reservationsToEvents(reservationsData));
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
				position: 'bottom-right',
			});
			return docRef;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
					position: 'bottom-right',
				});
			}

			throw error;
		}
	};

	const handleAddRegularReservation = async (
		data: ReservationForm,
		ocurrences: number
	): Promise<TEvent[]> => {
		try {
			const newReservations = await createRegularReservation(
				{
					...data,
					startTime: new Date(data.startTime),
					endTime: new Date(data.endTime),
					court: getCourtRef(params.id),
				},
				ocurrences
			);
			toast.success(`Reserva Múltiple Creada! (${ocurrences})`, {
				theme: 'colored',
				position: 'bottom-right',
			});
			return reservationsToEvents(newReservations);
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
					position: 'bottom-right',
				});
			}

			throw error;
		}
	};

	const handleDeleteReservation = async (id: string): Promise<boolean> => {
		try {
			await deleteReservation(id);
			toast.warn('Reserva Eliminada!', {
				theme: 'colored',
				position: 'bottom-right',
			});
			return true;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
					position: 'bottom-right',
				});
			}

			throw error;
		}
	};

	const handleUpdateReservation = async (
		data: ReservationForm
	): Promise<boolean> => {
		try {
			if (data.id === null) {
				throw new Error('missingReservationId');
			} else {
				const reservation: Reservation = {
					id: data.id,
					owner: data.owner,
					type: data.type,
					startTime: new Date(data.startTime),
					endTime: new Date(data.endTime),
					court: getCourtRef(params.id),
					price: data.price,
					status: data.status,
				};
				await updateReservation(reservation);
				toast.success('Reserva modificada!', {
					theme: 'colored',
					position: 'bottom-right',
				});
				return true;
			}
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
					position: 'bottom-right',
				});
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
				<CourtContext.Provider value={court}>
					<CalendarToolbar
						courtName={court?.name ?? '...'}
						currentDay={currentDay}
						setCurrentDay={setCurrentDay}
						currentView={currentView}
						handleCurrentViewChange={setCurrentView}
						showAll={showAll}
						setShowAll={handleShowAll}
					/>
					<Calendar
						events={reservations}
						handleAddEvent={handleAddReservation}
						handleAddRegularEvent={handleAddRegularReservation}
						handleDeleteEvent={handleDeleteReservation}
						handleUpdateEvent={handleUpdateReservation}
						minHour={minHour}
						maxHour={maxHour}
						currentView={currentView}
						setCurrentView={setCurrentView}
						currentDay={currentDay}
						setCurrentDay={setCurrentDay}
					/>
				</CourtContext.Provider>
			)}
		</div>
	);
}
