import React, { useEffect } from "react";

interface GetProfileRequestProps {
    onData: (data: any) => void; 
    onError: (error: string | null) => void; 
}

const GetProfileRequest: React.FC<GetProfileRequestProps> = ({ onData, onError }) => {
    useEffect(() => {
        const fetchProfile = async () => {
            const role = localStorage.getItem("role");
            const subStringOfRole = role?.substring(6,role.length - 1).toLowerCase()
            const token = localStorage.getItem("jwtToken"); 
            let endpoint = "";

            if (subStringOfRole == "rganization") {
                endpoint = "http://localhost:8080/api/v1/organization/my_profile";
            } else if (subStringOfRole == "volunteer") {
                endpoint = "http://localhost:8080/api/v1/volunteer/my_profile";
            } else {
                onError("Invalid user role. Unable to fetch profile.");
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
                    onData(data)
                } else {
                    onError(`Error: ${response.status} ${response.statusText}`);
                }
            } catch (err) {            
                console.log(role);
                onError("Failed to fetch profile data. Please try again later.");
            }
        };

        fetchProfile();
    }, [onData, onError]);

    return null; 
};

export default GetProfileRequest;
