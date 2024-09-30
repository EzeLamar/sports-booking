'use client';

import { deleteClient } from '@/app/firebase/clients/client';
import { Client } from '@/app/firebase/clients/model';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ClientEditForm from '@/app/components/Clients/ClientEditForm';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	Reservation,
	ReservationStatus,
} from '@/app/firebase/reservations/model';
import { getReservationsByClientId } from '@/app/firebase/reservations/reservation';
import Card from '@/app/components/UI/Card/Card';

type Props = {
	client: Client;
};

export default function ClientDetails({ client }: Props) {
	const router = useRouter();
	const [reservations, setReservations] = useState<Reservation[]>([]);

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const reservationsData = await getReservationsByClientId(client.id);
				setReservations(reservationsData);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchReservations();
	}, [client]);

	const handleDeleteClient = async (id: string): Promise<void> => {
		try {
			await deleteClient(id);
			toast.warn('Cliente Eliminado!', {
				theme: 'colored',
				position: 'bottom-right',
			});

			router.push('/clients');
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

	const booked = reservations.filter(
		reservation => reservation.status === ReservationStatus.Booked
	);
	const paid = reservations.filter(
		reservation => reservation.status === ReservationStatus.Paid
	);
	const cancelled = reservations.filter(
		reservation => reservation.status === ReservationStatus.Canceled
	);

	return (
		<div className='flex flex-col gap-3'>
			<h2 className='text-2xl mb-2 flex text-center justify-center items-center gap-2'>
				<User className='w-6 h-6' />
				{`${client.firstName} ${client.lastName}`}
			</h2>
			<Card>
				<h3 className='text-xl'>Reservas del Cliente</h3>
				<div className='mt-3 flex flex-col gap-2'>
					<p className='text-red-500'>{`Sin Pagar: ${booked.length}`}</p>
					<p className='text-green-600'>{`Pagadas: ${paid.length}`}</p>
					<p className='text-gray-500'>{`Canceladas: ${cancelled.length}`}</p>
				</div>
			</Card>
			<ClientEditForm client={client} />
			<Button
				className='mt-3'
				variant='destructive'
				onClick={() => handleDeleteClient(client.id)}
			>
				Borrar Cliente
			</Button>
		</div>
	);
}