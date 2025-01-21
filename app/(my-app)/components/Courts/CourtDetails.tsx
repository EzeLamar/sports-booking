'use client';

import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import ModalConfirmDelete from '@/app/(my-app)/components/UI/Modal/ModalConfirmDelete/ModalConfirmDelete';
import CourtSettings, {
	Court,
} from '@/app/(my-app)/components/Courts/CourtSettings/CourtSettings';
import { deleteCourt, editCourt } from '@/app/(my-app)/firebase/courts/courts';

type Props = {
	court: Court;
	setCourt: (court: Court) => void;
};

export default function CourtDetails({ court, setCourt }: Props) {
	const router = useRouter();

	const handleSubmit = (data: Court): Promise<boolean> => {
		const editData = async () => {
			try {
				const result = await editCourt(data);
				toast.success('Cancha actualizada!', {
					theme: 'colored',
				});
				setCourt(data);

				return result;
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}

				throw error;
			}
		};

		return editData();
	};

	const handleDeleteCourt = async (id: string): Promise<void> => {
		try {
			await deleteCourt(id);
			toast.warn('Cancha Eliminada!', {
				theme: 'colored',
			});

			router.push('/courts');
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, {
					theme: 'colored',
				});
			}

			throw error;
		}
	};

	return (
		<ModalConfirmDelete
			title='Cancha'
			description='Las reservas vinculadas a este cancha se mantendrán pero sin
		cancha asociada.'
			handleDelete={() => handleDeleteCourt(court.id)}
		>
			<div className='flex flex-col gap-3'>
				<h2 className='text-2xl mb-2 flex text-center justify-center items-center gap-2'>
					<MapPin className='w-6 h-6' />
					{court.name}
				</h2>
				<CourtSettings court={court} handleSubmit={handleSubmit} />
				<DialogTrigger asChild>
					<Button className='mt-3' variant='destructive'>
						Borrar
					</Button>
				</DialogTrigger>
			</div>
		</ModalConfirmDelete>
	);
}
