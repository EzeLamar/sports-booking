'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/app/(my-app)/context/AuthContext';
import Loading from '@/app/(my-app)/components/UI/Loading/Loading';

export default function Home() {
	const user = useAuthContext();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		if (user) {
			router.push('/courts');
		} else {
			setLoading(false);
		}
	}, [user, router]);

	return (
		<main className='flex justify-center'>
			{loading ? (
				<Loading />
			) : (
				<Card className='m-3 max-w-sm'>
					<CardHeader>
						<CardTitle>Bienvenido!</CardTitle>
						<CardDescription>
							Inicie sesión para acceder a la información de sus canchas
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button className='w-full' asChild>
							<Link href='/signin'>Ingresar</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</main>
	);
}
