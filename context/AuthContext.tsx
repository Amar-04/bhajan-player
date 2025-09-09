import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  role: "admin" | "user";
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  role: "user",
  loading: true,
  login: async () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<"admin" | "user">("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const r = session?.user?.user_metadata?.role;
      setRole(r === "admin" ? "admin" : "user");
      setLoading(false);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const r = session?.user?.user_metadata?.role;
        setRole(r === "admin" ? "admin" : "user");
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login failed:", error.message);
      return false;
    }

    const r = data.user?.user_metadata?.role;
    setRole(r === "admin" ? "admin" : "user");
    return r === "admin";
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setRole("user");
  };

  return (
    <AuthContext.Provider value={{ role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
