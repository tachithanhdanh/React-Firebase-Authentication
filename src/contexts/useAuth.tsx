import React, { useContext, useEffect } from "react";
import { firebaseAuth } from "../firebase";

export interface AuthContextProps {
  currentUser: firebase.default.User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[] | undefined;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] =
    React.useState<firebase.default.User | null>(null);
  // Set loading to true while we are fetching the user
  // Loading is true when the user is not available
  // Loading is false when the user is available
  const [loading, setLoading] = React.useState<boolean>(true);

  async function signup(email: string, password: string): Promise<void> {
    // Signup logic here
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email: string, password: string): Promise<void> {
    // Login logic here
    await firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async function logout(): Promise<void> {
    // Logout logic here
    await firebaseAuth.signOut();
  }

  useEffect(() => {
    // Subscribe to auth state changes
    // This will trigger when the user is signed in or signed out
    // This will also trigger when the user's token is refreshed
    // This is the recommended way to manage the user's session
    // Whenever the user's session changes, the callback will be triggered
    // which will update the currentUser state
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // user is available
      // Set loading to false
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
