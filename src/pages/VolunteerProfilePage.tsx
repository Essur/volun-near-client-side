import React, { CSSProperties, useState } from "react";
import { useProfile } from "../components/context/ProfileContext";
import VolunteerEditForm from "./VolunteerEditForm";

const VolunteerProfilePage: React.FC = () => {
    const { profileData, error, fetchProfile, updateProfile } = useProfile();
    const [showMenu, setShowMenu] = useState(false);
    const [newPreference, setNewPreference] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    
    const handleAddPreference = async () => {
        const role = localStorage.getItem("role");
        if (
            newPreference.trim() &&
            profileData &&
            role?.substring(6, role.length - 1).toLowerCase() === "volunteer"
        ) {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/volunteer/set_preferences",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                        },
                        body: JSON.stringify({ preferences: [newPreference] }),
                    }
                );

                if (response.ok) {
                    updateProfile({
                        ...profileData,
                        preferences: [...profileData.preferences, newPreference],
                    });
                    setNewPreference("");
                    console.log("Preference added successfully.");
                } else {
                    console.error("Failed to add preference.");
                }
            } catch (err) {
                console.error("Error adding preference:", err);
            }
        }
    };

    const handleRemovePreference = async (preferenceId: number) => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/volunteer/delete_preference",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                    body: JSON.stringify({ preferenceId }),
                }
            );

            if (response.ok) {
                updateProfile({
                    ...profileData,
                    preferences: profileData.preferences.filter(
                        (pref: { preferenceId: number }) => pref.preferenceId !== preferenceId
                    ),
                });
            } else {
                console.error("Failed to remove preference.");
            }
        } catch (err) {
            console.error("Error removing preference:", err);
        }
    };

    return (
        <div style={styles.container}>
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
                                {profileData.preferences.map((pref: { preferenceId: number; preferenceName: string }) => (
                                    <li key={pref.preferenceId}>
                                        {pref.preferenceName}
                                        <button
                                            style={styles.removeButton}
                                            onClick={() => handleRemovePreference(pref.preferenceId)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <button style={styles.manageButton} onClick={() => setShowMenu(!showMenu)}>
                        Manage Preferences
                    </button>
                    <button style={styles.editButton} onClick={() => setIsEditModalOpen(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div>Loading profile data...</div>
            )}

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

            {isEditModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <button
                            style={styles.closeButton}
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            ×
                        </button>
                        <VolunteerEditForm
                            profileData={profileData}
                            onClose={() => setIsEditModalOpen(false)}
                            onUpdate={(updatedProfile) => updateProfile(updatedProfile)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const styles : { [key: string]: CSSProperties } ={
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
    editButton: {
        marginTop: "10px",
        backgroundColor: "#28a745",
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
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },
};

export default VolunteerProfilePage;
