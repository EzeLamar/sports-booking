'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';

export default function AdminPage() {
	const user = useAuthContext();
	const router = useRouter();

	useEffect((): void => {
		if (user === null) router.push('/');
	}, [user, router]);

	return (
		<div>
			<h1>
				Hi
				{user?.email}
			</h1>
			<p>Only logged in users can view this page</p>
		</div>
	);
}
