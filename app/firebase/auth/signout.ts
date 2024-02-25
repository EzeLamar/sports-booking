import { signOut, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function logout() {
	let error = null;
	try {
		await signOut(auth);
	} catch (e) {
		error = e;
	}

	return { error };
}
