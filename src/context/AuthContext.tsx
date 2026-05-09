import type {
  ReactNode,
} from "react";

import {
  createContext,
  useEffect,
  useState,
} from "react";

// =====================================================
// USER TYPE
// =====================================================
interface UserType {
  _id: string;

  name?: string;

  email: string;

  role:
    | "buyer"
    | "seller";

  token: string;

  seller?: {
    shopName?: string;
  };
}

// =====================================================
// CONTEXT TYPE
// =====================================================
interface AuthContextType {
  user: UserType | null;

  setUser: (
    user: UserType | null
  ) => void;

  logout: () => void;
}

// =====================================================
// CONTEXT
// =====================================================
export const AuthContext =
  createContext<AuthContextType>(
    {
      user: null,

      setUser: () => {},

      logout: () => {},
    }
  );

// =====================================================
// PROVIDER
// =====================================================
export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<UserType | null>(
      null
    );

  // =====================================================
  // LOAD USER
  // =====================================================
  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (storedUser) {
        const parsedUser =
          JSON.parse(
            storedUser
          );

        if (
          parsedUser?.role ===
            "buyer" ||
          parsedUser?.role ===
            "seller"
        ) {
          setUser(
            parsedUser
          );
        } else {
          localStorage.removeItem(
            "user"
          );

          localStorage.removeItem(
            "token"
          );
        }
      }
    } catch (error) {
      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );
    }
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};