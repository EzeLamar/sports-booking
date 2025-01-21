import { Reservation } from '@/app/(my-app)/firebase/reservations/model';
import Link from 'next/link';
import React from 'react';

type Props = {
	reservationInfo: Reservation;
};

export default function ReservationWidget({ reservationInfo }: Props) {
	return (
		<div>
			<h2>
				Reserva para la cancha{' '}
				<Link href={`/courts/${reservationInfo.court.id}`}>
					{reservationInfo.court.id}
				</Link>
			</h2>
			<ul>
				<li>Titular: {reservationInfo.owner}</li>
				<li>Hora inicio: {reservationInfo.startTime.toString()}</li>
				<li>Hora final: {reservationInfo.endTime.toString()}</li>
			</ul>
		</div>
	);
}
