'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, googlePopUpSignIn } from '../firebase/auth/signin';
import 'react-toastify/dist/ReactToastify.css';
import Signin, { Login } from '../components/Login/Signin/Signin';

export default function SignInPage() {
	const router = useRouter();

	const handleGoogleLogin = (): void => {
		const signinGoogleUser = async () => {
			try {
				await googlePopUpSignIn();
			} catch (error) {
				toast.error(error.message, { theme: 'colored' });
			}

			router.push('/admin');
		};
		signinGoogleUser();
	};

	const handleSubmit = (data: Login): Promise<boolean> => {
		const signinUser = async () => {
			try {
				await signIn(data.user, data.password);
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
			<Signin
				handleSubmit={handleSubmit}
				handleGoogleLogin={handleGoogleLogin}
			/>
		</div>
	);
}
