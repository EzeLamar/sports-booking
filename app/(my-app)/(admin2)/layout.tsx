'use client';

import Loading from '@/app/(my-app)/components/UI/Loading/Loading';
import { useAuthContext } from '@/app/(my-app)/context/AuthContext';
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

	return <div className='p-3'>{!user ? <Loading /> : children}</div>;
}
