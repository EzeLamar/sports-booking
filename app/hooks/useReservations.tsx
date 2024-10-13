import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import { TEvent } from '@/app/components/UI/Calendar/model';
import { Client } from '@/app/firebase/clients/model';
import { getCourt, getCourtRef } from '@/app/firebase/courts/courts';
import {
	Reservation,
	ReservationStatus,
	ReservationType,
} from '@/app/firebase/reservations/model';
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

export type Filters = {
	clientIds: string[];
	types: ReservationType[];
	status: ReservationStatus[];
};

type Props = {
	courtId: string;
	clients: Client[];
};

type useReservationsProps = {
	court: Court | null;
	reservations: TEvent[];
	loading: boolean;
	hasFilter: boolean;
	filters: Filters;
	setFilters: (filters: Filters) => void;
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
			show: true,
		},
	}));

export default function useReservations({
	courtId,
	clients,
}: Props): useReservationsProps {
	const [reservations, setReservations] = useState<TEvent[]>([]);
	const [court, setCourt] = useState<Court | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [filters, setFilters] = useState<Filters>({
		clientIds: [],
		types: [],
		status: [],
	});
	const hasFilter =
		filters.clientIds.length > 0 ||
		filters.types.length > 0 ||
		filters.status.length > 0;

	useEffect((): void => {
		const fetchReservations = async () => {
			if (clients.length === 0) {
				return;
			}
			try {
				const courtData = await getCourt(courtId);
				const reservationsData = await getAllReservationsByCourtId(courtId);
				setCourt(courtData);
				const reservationData = reservationsToEvents(reservationsData, clients);
				setReservations(reservationData);
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchReservations();
	}, [courtId, clients]);

	useEffect((): void => {
		const { clientIds, types, status } = filters;
		const reservationFilters: ((reservation: TEvent) => boolean)[] = [];
		const filterByClientIds = (reservation: TEvent) =>
			reservation.data.owner?.id
				? clientIds.includes(reservation.data.owner.id)
				: false;
		const filterByTypes = (reservation: TEvent) =>
			types.includes(reservation.data.type);
		const filterByStatus = (reservation: TEvent) =>
			status.includes(reservation.data.status);

		if (clientIds.length > 0) {
			reservationFilters.push(filterByClientIds);
		}
		if (types.length > 0) {
			reservationFilters.push(filterByTypes);
		}
		if (status.length > 0) {
			reservationFilters.push(filterByStatus);
		}
		setReservations(currentReservations =>
			currentReservations.map(reservation => ({
				...reservation,
				data: {
					...reservation.data,
					show: reservationFilters.every(filter => filter(reservation)),
				},
			}))
		);
	}, [filters]);

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

			const newEvent: TEvent = {
				start: data.startTime,
				end: data.endTime,
				title: 'Test Title',
				data: {
					id: docRef,
					type: data.type,
					owner: clients.find(client => client.id === data.owner) ?? null,
					price: data.price,
					status: data.status,
					show: true,
				},
				desc: '',
			};
			setReservations([...reservations, newEvent]);
			toast.success('Reserva Creada!', {
				theme: 'colored',
			});
			return docRef;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
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
			});
			const newEvents = reservationsToEvents(newReservations, clients);
			setReservations([...reservations, ...newEvents]);

			return newEvents;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
				});
			}

			throw error;
		}
	};

	const handleDeleteReservation = async (id: string): Promise<boolean> => {
		try {
			await deleteReservation(id);
			toast.warning('Reserva Eliminada!', {
				theme: 'colored',
			});
			setReservations(reservations.filter(event => event.data.id !== id));

			return true;
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
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
				});

				const updatedEvent: TEvent = {
					start: data.startTime,
					end: data.endTime,
					title: 'Test Title',
					data: {
						id: data.id ?? '', // TODO: this will be fixed in a future update
						type: data.type,
						owner: clients.find(client => client.id === data.owner) ?? null,
						price: data.price,
						status: data.status,
						show: true,
					},
					desc: '',
				};
				setReservations([
					...reservations.filter(event => event.data.id !== data.id),
					updatedEvent,
				]);

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
		hasFilter,
		filters,
		setFilters,
		handleAddReservation,
		handleAddRegularReservation,
		handleDeleteReservation,
		handleUpdateReservation,
	};
}
