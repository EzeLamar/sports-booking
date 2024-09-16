'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourtSettings, {
	Court,
} from '@/app/components/Courts/CourtSettings/CourtSettings';
import { editCourt, getCourt } from '@/app/firebase/courts/courts';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Loading from '@/app/components/UI/Loading/Loading';

type Props = {
	courtId: string;
};

export default function CourtSettingsView({ courtId }: Props) {
	const [court, setCourt] = useState<Court | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

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

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtData = await getCourt(courtId);
				setCourt(courtData);
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};

		fetchData();
	}, [courtId]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<CourtSettings court={court} handleSubmit={handleSubmit} />
			)}
		</div>
	);
}
