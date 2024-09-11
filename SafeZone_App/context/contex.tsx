import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorage';

const AuthContext = createContext<{
  signIn: (userDetails: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (userDetails: string) => {
    console.log(userDetails);
  },
  signOut: () => null,
  session: null,
  isLoading: false,
  
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (userDetails: string) => {
          setSession(userDetails);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
