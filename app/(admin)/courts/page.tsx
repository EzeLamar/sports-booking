'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getAllCourts } from '@/app/firebase/courts/courts';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Loading from '@/app/components/UI/Loading/Loading';
import CourtCard from '@/app/components/Courts/CourtCard';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';

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
