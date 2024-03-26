'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';
import CourtSettingsView from './CourtSettingsView';
import Loading from '../../components/UI/Loading/Loading';

export default function CourtPage() {
	const user = useAuthContext();
	const router = useRouter();

	useEffect((): void => {
		if (!user) {
			router.push('/signin');
		}
	}, [user, router]);

	return !user ? (
		<Loading />
	) : (
		<>
			<h2>Court View: Hi {user.email}</h2>
			<CourtSettingsView />
		</>
	);
}
