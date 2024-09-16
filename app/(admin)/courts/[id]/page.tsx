'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';
import Loading from '@/app/components/UI/Loading/Loading';
import CourtSettingsView from '@/app/(admin)/courts/[id]/CourtSettingsView';

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
		<div className='d-flex p-3'>
			<CourtSettingsView courtId={courtId} />
		</div>
	);
}
