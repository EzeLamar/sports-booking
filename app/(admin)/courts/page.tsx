'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getAllCourts } from '@/app/firebase/courts/courts';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Loading from '@/app/components/UI/Loading/Loading';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import CourtsView from '@/app/components/Courts/View/CourtsView';

export default function CourtsPage() {
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

	return loading ? <Loading /> : <CourtsView courts={courts} />;
}
