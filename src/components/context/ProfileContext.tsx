import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

    const fetchProfile = async () => {
        const role = localStorage.getItem("role");
        const subStringOfRole = role?.substring(6, role.length - 1).toLowerCase();
        const token = localStorage.getItem("jwtToken");

        let endpoint = "";

        if (subStringOfRole === "organization") {
            endpoint = "http://localhost:8080/api/v1/organization/my_profile";
        } else if (subStringOfRole === "volunteer") {
            endpoint = "http://localhost:8080/api/v1/volunteer/my_profile";
        } else {
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
                setError(null);
            } else {
                setError(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            setError("Failed to fetch profile data. Please try again later.");
        }
    };

    const updateProfile = (data: any) => {
        setProfileData(data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

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
