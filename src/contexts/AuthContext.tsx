import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { REFRESH_TOKEN } from "../config/ApiRoutes";

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    role: string | null;
    login: (username: string, token: string, refreshToken: string, role: string, expiresIn: number) => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("jwtToken"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

    const login = (username: string, token: string, refreshToken: string, role: string, expiresIn: number) => {
        const expiryTime = Date.now() + expiresIn * 1000;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        setIsLoggedIn(true);
        setUsername(username);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("tokenExpiry");
        setIsLoggedIn(false);
        setUsername(null);
        setRole(null);
    };

    const refreshToken = async () => {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
            logout();
            return;
        }

        try {
            const response = await fetch(REFRESH_TOKEN, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ refreshToken: storedRefreshToken }),
            });
    
            if (!response.ok) throw new Error("Failed to refresh token");
    
            const data = await response.json();
            const expiryTime = Date.now() + data.expiresIn * 1000;

            localStorage.setItem("jwtToken", data.token);
            localStorage.setItem("tokenExpiry", expiryTime.toString());

            setIsLoggedIn(true);
            setUsername(localStorage.getItem("username"));
            setRole(localStorage.getItem("role"));
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };
    

    useEffect(() => {
        const checkTokenExpiry = () => {
            const expiryTime = localStorage.getItem("tokenExpiry");
            if (!expiryTime) return;

            const timeLeft = parseInt(expiryTime, 10) - Date.now();
            if (timeLeft < 60000) { // Refresh 1 minute before expiry
                refreshToken();
            }
        };

        const interval = setInterval(checkTokenExpiry, 30000); // Check every 30 sec
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, role, login, logout, refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
