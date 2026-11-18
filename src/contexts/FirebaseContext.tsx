import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  authLoading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

async function syncUserProfile(currentUser: User) {
  if (!currentUser.email || !currentUser.emailVerified) return;

  const userPath = `users/${currentUser.uid}`;
  const userRef = doc(db, 'users', currentUser.uid);

  const safeDisplayName = (currentUser.displayName || 'Customer').trim().slice(0, 100);
  const safeEmail = currentUser.email.trim().slice(0, 150);
  const safePhoto = (currentUser.photoURL || '').trim().slice(0, 500);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: currentUser.uid,
        displayName: safeDisplayName,
        email: safeEmail,
        photoURL: safePhoto,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(
        userRef,
        {
          uid: currentUser.uid,
          displayName: safeDisplayName,
          email: safeEmail,
          photoURL: safePhoto,
          createdAt: snap.data().createdAt ?? serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    // Log structured Firestore error info without crashing auth state
    try {
      handleFirestoreError(error, OperationType.WRITE, userPath);
    } catch {
      // handled via console.error inside handleFirestoreError
    }
  }
}

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
      if (firebaseUser) {
        void syncUserProfile(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(result.user);
      return result.user;
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Google sign-in could not be completed.';
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError('Sign-in failed. Please allow popups and try again.');
      }
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const signOutUser = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch {
      setAuthError('Could not sign out cleanly. Please try again.');
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        authReady,
        authLoading,
        authError,
        signInWithGoogle,
        signOutUser,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase(): FirebaseContextValue {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used inside a FirebaseProvider');
  }
  return ctx;
}
