import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string) {
	let result = null;
	let error = null;
	try {
		result = await createUserWithEmailAndPassword(auth, email, password);
	} catch (e) {
		error = e;
	}

	return { result, error };
}
