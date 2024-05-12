'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/UI/Loading/Loading';

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = useAuthContext();
	const router = useRouter();

	useEffect((): void => {
		if (!user) {
			router.push('/signin');
		}
	}, [user, router]);

	return !user ? <Loading /> : <div>{children}</div>;
}
