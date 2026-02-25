import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean;
  login: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  login: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => setIsLoggedIn(true), []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
