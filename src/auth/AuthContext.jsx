import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")||"null"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (u, t) => {
    setUser(u); setToken(t);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", t);
  };
  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return <AuthCtx.Provider value={{ user, token, login, logout }}>{children}</AuthCtx.Provider>;
}
