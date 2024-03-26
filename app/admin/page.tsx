'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/UI/Loading/Loading';

export default function AdminPage() {
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
			<h2>Admin View: Hi {user.email}</h2>
			<p>Only logged in users can view this page</p>
		</>
	);
}
