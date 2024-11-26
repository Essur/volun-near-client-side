import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    role: string | null;
    login: (username: string, token: string, role: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("jwtToken"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

    const login = (username: string, token: string, role: string) => {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role)
        setIsLoggedIn(true);
        setUsername(username);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role")
        localStorage.clear();
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, role, login, logout }}>
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
