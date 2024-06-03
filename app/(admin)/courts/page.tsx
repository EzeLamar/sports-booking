'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CourtCard from '@/app/components/Courts/CourtCard';
import Loading from '../../components/UI/Loading/Loading';
import hasErrorMessage from '../../utils/Error/ErrorHelper';
import { Court } from '../../components/Courts/CourtSettings/CourtSettings';
import { getAllCourts } from '../../firebase/courts/courts';

export default function CourtsView() {
	const router = useRouter();
	const [courts, setCourts] = useState<Array<Court>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtsData = await getAllCourts();
				setCourts(courtsData);
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [router]);

	return loading ? (
		<Loading />
	) : (
		<div className='d-flex gap-3 flex-wrap flex-sm-row flex-column align-items-center justify-content-around'>
			{courts.map(court => (
				<CourtCard key={court.id} name={court.name} id={court.id} />
			))}
		</div>
	);
}
