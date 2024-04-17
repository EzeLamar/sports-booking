import {
	signInWithEmailAndPassword,
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	UserCredential,
} from 'firebase/auth';
import firebaseApp from '../config';

const auth = getAuth(firebaseApp);

export async function googlePopUpSignIn(): Promise<void> {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
}

export async function signIn(
	email: string,
	password: string
): Promise<UserCredential> {
	return signInWithEmailAndPassword(auth, email, password);
}
