import React from "react";
import { useProfile } from "../components/context/ProfileContext";

const OrganizationProfilePage: React.FC = () => {
    const { profileData, error } = useProfile();

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
                            <li><strong>Name:</strong> {profileData.organizationResponseDTO.nameOfOrganization}</li>
                            <li><strong>Country:</strong> {profileData.organizationResponseDTO.country}</li>
                            <li><strong>City:</strong> {profileData.organizationResponseDTO.city}</li>
                            <li><strong>Address:</strong> {profileData.organizationResponseDTO.address}</li>
                            <li><strong>Email:</strong> {profileData.organizationResponseDTO.email}</li>
                        </ul>
                    </div>

                    <div style={styles.activitiesSection}>
                        <h3>Activities</h3>
                        {profileData.activities.length > 0 ? (
                            <ul>
                                {profileData.activities.map((activity: { id : number,  title: string, description: string, kindOfActivity: string, city: string, country: string, dateOfPlace: string}) => (
                                    <li key={activity.id} style={styles.activityItem}>
                                        <h4>{activity.title}</h4>
                                        <p><strong>Description:</strong> {activity.description}</p>
                                        <p><strong>Type:</strong> {activity.kindOfActivity}</p>
                                        <p><strong>Location:</strong> {activity.city}, {activity.country}</p>
                                        <p>
                                            <strong>Date:</strong>{" "}
                                            {new Date(activity.dateOfPlace).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No activities available.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div>Loading profile data...</div>
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
};

export default OrganizationProfilePage;
