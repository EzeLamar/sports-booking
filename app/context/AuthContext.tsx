'use client';

import {
  useState, useEffect, useContext, createContext, ReactNode, useMemo,
} from 'react';
import {
  onAuthStateChanged,
  getAuth,
  User,
} from 'firebase/auth';
import firebaseApp from '../firebase/config';

const auth = getAuth(firebaseApp);

export type AuthContent = {
    user: User | null,
  }

export const AuthContext = createContext<AuthContent>({
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children } : { children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authContextValue = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
