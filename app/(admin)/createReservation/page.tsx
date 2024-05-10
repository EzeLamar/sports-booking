'use client';

import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReservationForm, {
	Reservation,
} from '../../components/Reservations/ReservationForm';
import { createReservation } from '../../firebase/reservations/reservation';
import { getCourtRef } from '../../firebase/courts/courts';
import hasErrorMessage from '../../utils/Error/ErrorHelper';

// FIXME: this is just a test view, will be deleted once we have the calendar for new reservations
export default function CreateReservationPage() {
	return (
		<ReservationForm
			reservation={{
				owner: 'Prueba',
				startTime: new Date(),
				endTime: new Date(),
			}}
			handleSubmit={async (data: Reservation): Promise<boolean> => {
				try {
					const result = createReservation({
						...data,
						startTime: new Date(data.startTime),
						endTime: new Date(data.endTime),
						court: getCourtRef(
							process.env.NEXT_PUBLIC_BURATO_COURT_ID ??
								'NEXT_PUBLIC_BURATO_COURT_ID'
						),
					});
					toast.success('Evento creado!', {
						theme: 'colored',
					});
					return result;
				} catch (error: unknown) {
					if (hasErrorMessage(error)) {
						toast.error(error.message, { theme: 'colored' });
					}

					throw error;
				}
			}}
			handleCancel={(): void => {}}
		/>
	);
}
