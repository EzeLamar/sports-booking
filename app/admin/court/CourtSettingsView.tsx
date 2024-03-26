'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourtSettings, {
	Court,
} from '../../components/Courts/CourtSettings/CourtSettings';
import { getCourt, editCourt } from '../../firebase/courts/courts';
import Loading from '../../components/UI/Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

export default function CourtSettingsView() {
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
			} catch (error) {
				toast.error(error.message, { theme: 'colored' });

				throw error;
			}
		};

		return editData();
	};

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtData = await getCourt();
				setCourt(courtData);
				setLoading(false);
			} catch (error) {
				toast.error(error.message, { theme: 'colored' });
			}
		};

		fetchData();
	}, []);

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