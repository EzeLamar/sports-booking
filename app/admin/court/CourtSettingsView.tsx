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

	const handleSubmit = (data: Court): Promise<boolean> =>
		editCourt(data)
			.then(() => {
				toast.success('Cancha actualizada!', {
					theme: 'colored',
				});
				setCourt(data);

				return true;
			})
			.catch(error => {
				toast.error(error.message, { theme: 'colored' });
				return false;
			});

	useEffect((): void => {
		getCourt()
			.then(data => {
				setCourt(data);
				setLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch(error => console.log(error.message));
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
