import React, { useState } from "react";
import GetProfileRequest from "../components/userActions/GetProfileRequest";

const ProfilePage: React.FC = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false); 
    const [newPreference, setNewPreference] = useState<string>("");



    const handleAddPreference = async () => {
        const role = localStorage.getItem("role");
        if (newPreference.trim() && profileData && role?.substring(6, role.length - 1).toLowerCase() === "volunteer") {
            try {
                const response = await fetch("http://localhost:8080/api/v1/volunteer/set_preferences", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                    body: JSON.stringify({ preferences: [...profileData.preferences, newPreference] }),
                });

                if (response.ok) {
                    setProfileData((prev: any) => ({
                        ...prev,
                        preferences: [...prev.preferences, newPreference],
                    }));
                    setNewPreference("");
                    console.log(response.body);
                } else {
                    console.error("Failed to add preference.");
                }
            } catch (err) {
                console.error("Error adding preference:", err);
            }
        }
    };

    const handleRemovePreference = async (preference: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/volunteer/preferences", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ preference }),
            });

            if (response.ok) {
                setProfileData((prev: any) => ({
                    ...prev,
                    preferences: prev.preferences.filter((pref: string) => pref !== preference),
                }));
            } else {
                console.error("Failed to remove preference.");
            }
        } catch (err) {
            console.error("Error removing preference:", err);
        }
    };

    return (
        <div style={styles.container}>
            <h2>My Profile</h2>

            {/* Fetch profile data */}
            <GetProfileRequest
                onData={(data) => {
                    setProfileData(data);
                    setError(null); // Clear error if data is successfully fetched
                }}
                onError={(err) => {
                    setError(err);
                    setProfileData(null); // Clear data if there's an error
                }}
            />

            {/* Render profile data or error */}
            {error ? (
                <div style={styles.error}>{error}</div>
            ) : profileData ? (
                <div style={styles.profile}>
                    <h3>Profile Details</h3>
                    <ul style={styles.list}>
                        <li><strong>Email:</strong> {profileData.email}</li>
                        <li><strong>Username:</strong> {profileData.username}</li>
                        <li><strong>First Name:</strong> {profileData.firstName}</li>
                        <li><strong>Last Name:</strong> {profileData.lastName}</li>
                        <li>
                            <strong>Preferences:</strong>
                            <ul>
                                {profileData.preferences.map((pref: string, index: number) => (
                                    <li key={index}>
                                        {pref}
                                        <button
                                            style={styles.removeButton}
                                            onClick={() => handleRemovePreference(pref)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <button
                        style={styles.manageButton}
                        onClick={() => {
                            setShowMenu(!showMenu);
                        }}
                    >
                        Manage Preferences
                    </button>
                </div>
            ) : (
                <div>Loading profile data...</div>
            )}

            {/* Preferences management menu */}
            {showMenu && (
                <div style={styles.menu}>
                    <h4>Add preference</h4>
                    <input
                        type="text"
                        placeholder="Add a preference"
                        value={newPreference}
                        onChange={(e) => setNewPreference(e.target.value)}
                        style={styles.input}
                    />
                    <button style={styles.addButton} onClick={handleAddPreference}>
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
    profile: {
        padding: "15px",
        borderRadius: "5px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    removeButton: {
        marginLeft: "10px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "3px",
    },
    manageButton: {
        marginTop: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "10px",
        borderRadius: "5px",
    },
    menu: {
        marginTop: "20px",
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    input: {
        marginRight: "10px",
        padding: "5px",
        borderRadius: "3px",
        border: "1px solid #ccc",
    },
    addButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "5px 10px",
        borderRadius: "3px",
    },
};

export default ProfilePage;
