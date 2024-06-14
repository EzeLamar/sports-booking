'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Reservation } from '@/app/firebase/reservations/model';
import ReservationWidget from '../../components/Reservations/Reservation';
import { getAllReservations } from '../../firebase/reservations/reservation';
import Loading from '../../components/UI/Loading/Loading';
import hasErrorMessage from '../../utils/Error/ErrorHelper';

// FIXME: this is just a test view, will be deleted once we have the calendar for reservations
export default function GetAllReservationsView() {
	const [loading, setLoading] = useState<boolean>(true);
	const [reservations, setReservations] = useState<Array<Reservation>>([]);

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const reservationsData = await getAllReservations();
				setReservations(reservationsData);
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<>
					<h2>List of reservations</h2>
					<ul>
						{reservations.map(reservation => (
							<li key={reservation.startTime.toISOString()}>
								<ReservationWidget reservationInfo={reservation} />
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
