'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReservationWidget, { ReservationType } from './Reservations/Reservation';
import { getReservation } from '../firebase/reservations/reservation';
import Loading from './UI/Loading/Loading';
import hasErrorMessage from '../utils/Error/ErrorHelper';

export default function ComponentsView() {
	const [loading, setLoading] = useState<boolean>(true);
	const [reservation, setReservation] = useState<ReservationType>();

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const reservationData = await getReservation();
				setReservation(reservationData);
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
				reservation && <ReservationWidget reservationInfo={reservation} />
			)}
		</div>
	);
}
