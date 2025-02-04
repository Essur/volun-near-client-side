import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GET_ORGANIZATION_PROFILE, GET_VOLUNTEER_PROFILE } from "../config/ApiRoutes";
import { useAuth } from "./AuthContext";

interface ProfileContextProps {
    profileData: any | null;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: any) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { refreshToken, logout, role } = useAuth();



    const fetchProfile = async () => {
        if (!location.pathname.includes("-profile")) return;

        let token = localStorage.getItem("jwtToken");
        const subStringOfRole = role?.substring(5, role.length).toLowerCase();

        if (isTokenExpired()) {
            await refreshToken();
            token = localStorage.getItem("jwtToken");
            if (!token || !role) {
                window.location.href = "/login";
                return;
            }
        }

        let endpoint = "";

        if (subStringOfRole === "organization") {
            endpoint = GET_ORGANIZATION_PROFILE;
        } else if (subStringOfRole === "volunteer") {
            endpoint = GET_VOLUNTEER_PROFILE;
        } else {
            window.location.reload;
            setError("Invalid user role. Unable to fetch profile.");
            console.log(subStringOfRole);
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
            } else {
                logout();
                window.location.href = "/login";
                setError(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            setError("Failed to fetch profile data. Please try again later.");
        }
    };

    const isTokenExpired = (): boolean => {
        const expiryTime = localStorage.getItem("tokenExpiry");
        if (!expiryTime) return true;

        return Date.now() > parseInt(expiryTime, 10);
    };

    const updateProfile = (data: any) => {
        setProfileData(data);
    };

  


    return (
        <ProfileContext.Provider value={{ profileData, error, fetchProfile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};
