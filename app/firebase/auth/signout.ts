import { signOut, getAuth } from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export default async function logout(): Promise<void> {
	signOut(auth);
}
