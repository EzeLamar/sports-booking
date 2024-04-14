'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import signIn from '../firebase/auth/signin';
import 'react-toastify/dist/ReactToastify.css';
import Signin, { Login } from '../components/Login/Signin/Signin';

export default function SignInPage() {
	const router = useRouter();

	const handleSubmit = (data: Login): Promise<boolean> => {
		const signinUser = async () => {
			try {
				const { error } = await signIn(data.user, data.password);

				if (error) {
					toast.error('Error: Invalid Credentials');
					return false;
				}

				router.push('/admin');
			} catch (error) {
				toast.error(error.message, { theme: 'colored' });

				throw error;
			}

			return true;
		};

		return signinUser();
	};

	return (
		<div className='container'>
			<Signin handleSubmit={handleSubmit} />
		</div>
	);
}
