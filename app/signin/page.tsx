'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import signIn from '../firebase/auth/signin';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const router = useRouter();

	const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { error } = await signIn(email, password);

		if (error) {
			toast.error('Error: Invalid Credentials');
			return;
		}

		router.push('/admin');
	};
	return (
		<div className='wrapper'>
			<div className='form-wrapper'>
				<h1 className='mt-60 mb-30'>Sign In</h1>
				<form onSubmit={handleForm} className='form'>
					<label htmlFor='email'>
						<p>Email</p>
						<input
							onChange={e => setEmail(e.target.value)}
							required
							type='email'
							name='email'
							id='email'
							placeholder='example@mail.com'
						/>
					</label>
					<label htmlFor='password'>
						<p>Password</p>
						<input
							onChange={e => setPassword(e.target.value)}
							required
							type='password'
							name='password'
							id='password'
							placeholder='password'
						/>
					</label>
					<button type='submit'>Sign In</button>
				</form>
			</div>
		</div>
	);
}
