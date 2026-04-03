import { AppUser } from "@/entities/user/types";
import { createContext } from "react";

interface AuthContextTypes {
  user: AppUser | null
  isLoading: boolean,
  login: (userData: AppUser) => void,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextTypes | null>(null);