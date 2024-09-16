'use client';

import Loading from '@/app/components/UI/Loading/Loading';
import { useAuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
