import {
	InitialReservation,
	STATUS_VALUES,
} from '@/app/(my-app)/components/Reservations/ReservationForm';
import { ClientsContext } from '@/app/(my-app)/context/ClientsContext';
import {
	BanknoteIcon,
	CalendarIcon,
	HandCoinsIcon,
	UserIcon,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
	reservation: InitialReservation;
	rangeTime: string;
};
export default function ReservationDetails({ reservation, rangeTime }: Props) {
	const clients = useContext(ClientsContext);
	const reservationClient = clients.find(
		client => client.id === reservation.owner
	);
	if (reservation.id === null) {
		return null;
	}

	return (
		<div className=' space-y-6 bg-background/40 py-2 px-3 rounded-lg mb-3'>
			<Link href={`/clients/${reservationClient?.id}`}>
				<div className='flex items-center space-x-4'>
					<UserIcon className='w-6 h-6 text-gray-400' />
					<div>
						<p className='text-sm font-medium text-gray-500'>Titular</p>
						<p className='flex gap-3 text-lg font-semibold'>
							{`${reservationClient?.firstName} ${reservationClient?.lastName}`}
							<ExternalLink className='h-6 w-6 text-primary' />
						</p>
					</div>
				</div>
			</Link>
			<div className='flex items-center space-x-4'>
				<CalendarIcon className='w-6 h-6 text-gray-400' />
				<div>
					<p className='text-sm font-medium text-gray-500'>Fecha y Hora</p>
					<p className='text-lg font-semibold'>{rangeTime}</p>
				</div>
			</div>
			<div className='flex items-center space-x-4'>
				<BanknoteIcon className='w-6 h-6 text-gray-400' />
				<div>
					<p className='text-sm font-medium text-gray-500'>Precio</p>
					<p className='text-lg font-semibold'>${reservation.price}</p>
				</div>
			</div>
			<div className='flex items-center space-x-4'>
				<HandCoinsIcon className='w-6 h-6 text-gray-400' />
				<div>
					<p className='text-sm font-medium text-gray-500'>Estado</p>
					<p className='text-lg font-semibold'>
						{
							STATUS_VALUES.find(status => status.value === reservation.status)
								?.label
						}
					</p>
				</div>
			</div>
		</div>
	);
}
