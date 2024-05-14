'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import ReservationWidget, { ReservationType } from './Reservations/Reservation';
import { getAllReservations } from '../firebase/reservations/reservation';
import Loading from './UI/Loading/Loading';
import hasErrorMessage from '../utils/Error/ErrorHelper';

export default function ComponentsView() {
	const user = useAuthContext();
	const router = useRouter();
	const [reservations, setReservations] = useState<Array<ReservationType>>([]);

	useEffect((): void => {
		if (!user) {
			router.push('/signin');
		}
		const fetchData = async () => {
			try {
				const reservationData = await getAllReservations();
				setReservations(reservationData);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [user, router]);

	return !user ? (
		<Loading />
	) : (
		<>
			<h2>List of reservations</h2>
			<ul>
				{reservations.map(reservation => (
					<li key={reservation.court.id + reservation.startTime}>
						<ReservationWidget reservationInfo={reservation} />
					</li>
				))}
			</ul>
		</>
	);
}
