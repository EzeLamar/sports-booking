import { DocumentReference } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';

export type ReservationType = {
	court: DocumentReference;
	owner: string;
	startTime: Date;
	endTime: Date;
};

type Props = {
	reservationInfo: ReservationType;
};

export default function ReservationWidget({ reservationInfo }: Props) {
	return (
		<div>
			<h2>
				Reserva para la cancha{' '}
				<Link href={`/admin/courts/${reservationInfo.court.id}`}>
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
