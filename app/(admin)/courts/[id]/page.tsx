'use client';

import Loading from '@/app/components/UI/Loading/Loading';
import { useEffect, useState } from 'react';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import { getCourt } from '@/app/firebase/courts/courts';
import CourtDetails from '@/app/components/Courts/CourtDetails';

export default function CourtDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const courtId = params.id;
	const router = useRouter();
	const [court, setCourt] = useState<Court>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const courtsData = await getCourt(courtId);

				setCourt(courtsData);
				setLoading(false);
			} catch (error: unknown) {
				router.push('/courts');

				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [courtId, router]);

	return loading ? (
		<Loading />
	) : (
		court && <CourtDetails court={court} setCourt={setCourt} />
	);
}
