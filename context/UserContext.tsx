"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      const headers: Record<string, string> = { Accept: "application/json" };
      if (storedToken) headers["Authorization"] = `Bearer ${storedToken}`;

      const res = await fetch("/api/user", {
        headers,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setToken(null);
    }
  };

  const logout = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: storedToken ? `Bearer ${storedToken}` : "",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setUser, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
