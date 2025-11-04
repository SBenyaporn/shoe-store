// src/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => localStorage.getItem("authed") === "1");
  
  useEffect(() => { 
    localStorage.setItem("authed", authed ? "1" : "0"); 
  }, [authed]);

  const signIn = async (credentials) => {
   
    if (credentials && credentials.email && credentials.password) {
      try {
        const data = await api("/api/auth/login", {
          method: "POST",
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

  
        if (data.user) {
          localStorage.setItem("demo_user", JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.full_name || data.user.fullName || "",
            full_name: data.user.full_name || "",
          }));
     
          window.dispatchEvent(new Event("user-updated"));
        }
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }
        
        setAuthed(true);
      } catch (err) {
        throw err;
      }
    } else {
   
      setAuthed(true);
    }
  };

  const signOut = () => {
    localStorage.removeItem("demo_user");
    localStorage.removeItem("auth_token");
    setAuthed(false);
  };

  return <AuthCtx.Provider value={{ authed, signIn, signOut }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
