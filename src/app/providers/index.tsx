import { ReactNode } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

interface AppProviderProps {
  children: ReactNode,
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
};