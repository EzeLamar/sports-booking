'use client';

import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import signUp from '../firebase/auth/signup';

export default function SignUpPage() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const router = useRouter();

	const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { error } = await signUp(email, password);

		if (error) {
			toast.error('Error');
			return;
		}

		router.push('/admin');
	};
	return (
		<div className='wrapper'>
			<div className='form-wrapper'>
				<h1 className='mt-60 mb-30'>Sign up</h1>
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
					<button type='submit'>Sign up</button>
				</form>
			</div>
		</div>
	);
}
