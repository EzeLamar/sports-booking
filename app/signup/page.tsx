'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import signUp from '../firebase/auth/signup';
import Signup, { Register } from '../components/Login/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import hasErrorMessage from '../utils/Error/ErrorHelper';

export default function SignUpPage() {
	const router = useRouter();

	const handleSubmit = (data: Register): Promise<boolean> => {
		const signupUser = async () => {
			try {
				const { error } = await signUp(data.user, data.password);

				if (error) {
					toast.error('Error: Invalid Credentials');
					return false;
				}

				toast.success(`Usuario ${data.user} registrado!`);
				router.push('/admin');
			} catch (error) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}

				throw error;
			}

			return true;
		};

		return signupUser();
	};

	return (
		<div className='container'>
			<Signup handleSubmit={handleSubmit} />
		</div>
	);
}
