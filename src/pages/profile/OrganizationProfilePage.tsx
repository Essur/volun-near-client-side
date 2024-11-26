import React, { CSSProperties, useContext, useState } from "react";
import { useProfile } from "../../components/context/ProfileContext";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import OrganizationEditForm from "../edits/OrganizationEditForm";

const OrganizationProfilePage: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { profileData, error } = useProfile();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    async function removeProfile(): Promise<void> {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/organization/delete_profile",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    }
                }
            );
            
            if (response.ok) {
                setTimeout(() => {
                    auth?.logout();
                    navigate("/");
                }, 2000);
            } else {
                console.error("Failed to remove preference.");
            }
        } catch (err) {
            console.error("Error removing preference:", err);
        }
    }
    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleUpdate = (updatedProfile: any) => {
        // Optionally handle updates to the profile data if required.
        console.log("Updated Profile:", updatedProfile);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div style={styles.container}>
            <h1>Organization Profile</h1>

            {error ? (
                <div style={styles.error}>{error}</div>
            ) : profileData ? (
                <div>
                    <div style={styles.profileSection}>
                        <h3>Organization Details</h3>
                        <ul>
                            <li>
                                <strong>Name:</strong>{" "}
                                {profileData.organizationResponseDTO.nameOfOrganization}
                            </li>
                            <li>
                                <strong>Country:</strong>{" "}
                                {profileData.organizationResponseDTO.country}
                            </li>
                            <li>
                                <strong>City:</strong>{" "}
                                {profileData.organizationResponseDTO.city}
                            </li>
                            <li>
                                <strong>Address:</strong>{" "}
                                {profileData.organizationResponseDTO.address}
                            </li>
                            <li>
                                <strong>Email:</strong>{" "}
                                {profileData.organizationResponseDTO.email}
                            </li>
                        </ul>
                    </div>

                    <div style={styles.activitiesSection}>
                        <h3>Activities</h3>
                        {profileData.activities.length > 0 ? (
                            <ul>
                                {profileData.activities.map(
                                    (activity: {
                                        id: number;
                                        title: string;
                                        description: string;
                                        kindOfActivity: string;
                                        city: string;
                                        country: string;
                                        dateOfPlace: string;
                                    }) => (
                                        <li key={activity.id} style={styles.activityItem}>
                                            <h4>{activity.title}</h4>
                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {activity.description}
                                            </p>
                                            <p>
                                                <strong>Type:</strong>{" "}
                                                {activity.kindOfActivity}
                                            </p>
                                            <p>
                                                <strong>Location:</strong>{" "}
                                                {activity.city}, {activity.country}
                                            </p>
                                            <p>
                                                <strong>Date:</strong>{" "}
                                                {new Date(activity.dateOfPlace).toLocaleDateString()}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <p>No activities available.</p>
                        )}
                    </div>

                    <button style={styles.button} onClick={handleEdit}>
                        Edit Profile
                    </button>
                    <button style={styles.button} onClick={removeProfile}>
                        Delete Profile
                    </button>
                </div>
            ) : (
                <div>Loading profile data...</div>
            )}

            {isEditModalOpen && (
                <div style={styles.modal}>
                    <OrganizationEditForm
                        profileData={profileData}
                        onClose={closeModal}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}
        </div>
    );
};

const styles : { [key: string]: CSSProperties } = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
    profileSection: {
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    activitiesSection: {
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    activityItem: {
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
    },
    button: {
        padding: "10px 15px",
        margin: "10px 5px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
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
        zIndex: 1000,
    },
};

export default OrganizationProfilePage;