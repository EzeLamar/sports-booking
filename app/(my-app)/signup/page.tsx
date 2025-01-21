'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import signUp from '@/app/(my-app)/firebase/auth/signup';
import Signup, {
	Register,
} from '@/app/(my-app)/components/Login/Signup/Signup';
import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';

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
				router.push('/');
			} catch (error) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, {
						theme: 'colored',
					});
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
