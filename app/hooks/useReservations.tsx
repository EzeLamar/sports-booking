import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import { TEvent } from '@/app/components/UI/Calendar/model';
import { Client } from '@/app/firebase/clients/model';
import { getCourt, getCourtRef } from '@/app/firebase/courts/courts';
import { Reservation } from '@/app/firebase/reservations/model';
import { Reservation as ReservationForm } from '@/app/components/Reservations/ReservationForm';
import {
	createRegularReservation,
	createReservation,
	deleteReservation,
	getAllReservationsByCourtId,
	updateReservation,
} from '@/app/firebase/reservations/reservation';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
	courtId: string;
	clients: Client[];
};

type useReservationsProps = {
	court: Court | null;
	reservations: TEvent[];
	loading: boolean;
	handleAddReservation: (data: ReservationForm) => Promise<string>;
	handleAddRegularReservation: (
		data: ReservationForm,
		ocurrences: number
	) => Promise<TEvent[]>;
	handleDeleteReservation: (id: string) => Promise<boolean>;
	handleUpdateReservation: (data: ReservationForm) => Promise<boolean>;
};

const reservationsToEvents = (
	reservationsData: Reservation[],
	clients: Client[]
): TEvent[] =>
	reservationsData.map(reservation => ({
		start: moment(reservation.startTime).toDate(),
		end: moment(reservation.endTime).toDate(),
		title: reservation.court.id,
		data: {
			id: reservation.id,
			type: reservation.type,
			owner: clients.find(client => client.id === reservation.owner) ?? null,
			price: reservation.price,
			status: reservation.status,
		},
	}));

export default function useReservations({
	courtId,
	clients,
}: Props): useReservationsProps {
	const [reservations, setReservations] = useState<TEvent[]>([]);
	const [court, setCourt] = useState<Court | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		const fetchReservations = async () => {
			if (clients.length === 0) {
				return;
			}
			try {
				const courtData = await getCourt(courtId);
				const reservationsData = await getAllReservationsByCourtId(courtId);
				setCourt(courtData);
				setReservations(reservationsToEvents(reservationsData, clients));
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchReservations();
	}, [courtId, clients]);

	const handleAddReservation = async (
		data: ReservationForm
	): Promise<string> => {
		try {
			const docRef = await createReservation({
				...data,
				startTime: new Date(data.startTime),
				endTime: new Date(data.endTime),
				court: getCourtRef(courtId),
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
					court: getCourtRef(courtId),
				},
				ocurrences
			);
			toast.success(`Reserva Múltiple Creada! (${ocurrences})`, {
				theme: 'colored',
				position: 'bottom-right',
			});
			return reservationsToEvents(newReservations, clients);
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
					court: getCourtRef(courtId),
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

	return {
		court,
		reservations,
		loading,
		handleAddReservation,
		handleAddRegularReservation,
		handleDeleteReservation,
		handleUpdateReservation,
	};
}
