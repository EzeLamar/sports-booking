'use client';

import {
	useState,
	useEffect,
	useContext,
	createContext,
	ReactNode,
} from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebaseApp from '../firebase/config';
import Loading from '../components/UI/Loading/Loading';
import NavbarPlaceholder from '../components/UI/Navbar/NavbarPlaceholder';

const auth = getAuth(firebaseApp);

export const AuthContext = createContext<User | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [authUser, setAuthUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={authUser}>
			{loading ? (
				<>
					<NavbarPlaceholder />
					<Loading />
				</>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}
