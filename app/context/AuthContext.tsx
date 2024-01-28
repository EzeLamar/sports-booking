'use client'
import { useState, useEffect, useContext, createContext } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);

export type AuthContent = {
    user: User | null,
  }

export const AuthContext = createContext<AuthContent>({
    user: null
    })

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children } : { children: any}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authContext: AuthContent = { user };
    
    return (
        <AuthContext.Provider value={authContext}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
