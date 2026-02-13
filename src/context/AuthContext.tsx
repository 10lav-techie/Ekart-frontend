import type { ReactNode } from "react";

import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  seller: any;
  setSeller: (seller: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  seller: null,
  setSeller: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    const storedSeller = localStorage.getItem("seller");
    if (storedSeller) {
      setSeller(JSON.parse(storedSeller));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("seller");
    setSeller(null);
  };

  return (
    <AuthContext.Provider value={{ seller, setSeller, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
