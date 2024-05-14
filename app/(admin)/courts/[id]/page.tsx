'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../../components/UI/Loading/Loading';
import { useAuthContext } from '../../../context/AuthContext';
import CourtSettingsView from '../CourtSettingsView';

export default function CourtView({ params }: { params: { id: string } }) {
	const user = useAuthContext();
	const router = useRouter();
	const courtId = params.id;

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
			<CourtSettingsView courtId={courtId} />
		</>
	);
}
