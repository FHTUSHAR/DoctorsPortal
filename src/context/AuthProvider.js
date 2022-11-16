import React, { useEffect } from 'react';
import { createContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import app from '../firebase/firebase.config'



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createGoogleUser = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    const createGithubUser = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGithub)
    }
    const userProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        });
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = { user, createGoogleUser, createGithubUser, logOut, createUser, signInUser, userProfile, loading }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;