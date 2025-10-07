"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;       
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,           
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);   

  useEffect(() => {
    const saved = localStorage.getItem("secureseed_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);     
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("secureseed_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("secureseed_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);