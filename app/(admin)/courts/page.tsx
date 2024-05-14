'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuthContext } from '../../context/AuthContext';
import Loading from '../../components/UI/Loading/Loading';
import hasErrorMessage from '../../utils/Error/ErrorHelper';
import { Court } from '../../components/Courts/CourtSettings/CourtSettings';
import { getAllCourts } from '../../firebase/courts/courts';

export default function CourtsView() {
	const user = useAuthContext();
	const router = useRouter();
	const [courts, setCourts] = useState<Array<Court>>([]);

	useEffect((): void => {
		if (!user) {
			router.push('/signin');
		}
		const fetchData = async () => {
			try {
				const courtsData = await getAllCourts();
				setCourts(courtsData);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [user, router]);

	return !user ? (
		<Loading />
	) : (
		<>
			<h2>List of courts</h2>
			<ul>
				{courts.map(court => (
					<li key={court.id}>
						<Link href={`/courts/${court.id}`}>
							{court.id} - {court.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
