'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, googlePopUpSignIn } from '@/app/firebase/auth/signin';
import Signin, { Login } from '@/app/components/Login/Signin/Signin';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';

export default function SignInPage() {
	const router = useRouter();

	const handleGoogleLogin = (): void => {
		const signinGoogleUser = async () => {
			try {
				await googlePopUpSignIn();
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}

			router.push('/');
		};
		signinGoogleUser();
	};

	const handleSubmit = (data: Login): Promise<boolean> => {
		const signinUser = async () => {
			try {
				await signIn(data.user, data.password);
				router.push('/');
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}

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
