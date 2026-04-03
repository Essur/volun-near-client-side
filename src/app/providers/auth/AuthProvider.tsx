import { AppUser } from "@/entities/user/types"
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { authService } from "@/features/auth/api/auth-api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Finish AuthContext use it as wrapper inside App.tsx, 
  // or better use index.ts from providers to union all providers
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await authService.fetchUser();
        setUser(response);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [])

  const handleLogin = (userData: AppUser) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};