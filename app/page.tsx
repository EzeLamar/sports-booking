'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context/AuthContext';
import Loading from './components/UI/Loading/Loading';

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
		<main className='bg-light'>
			{loading ? (
				<Loading />
			) : (
				<div className='d-flex flex-column justify-content-center align-items-center gap-4 p-5 '>
					<h2 className='text-center'>Bienvenido!</h2>
					<p className='text-center'>
						Inicie sesión para acceder a la información de sus canchas...
					</p>
					<Link
						className='d-flex justify-content-center w-50 btn btn-primary p'
						href='/signin'
						style={{ maxWidth: '200px' }}
					>
						Ingresar
					</Link>
				</div>
			)}
		</main>
	);
}
