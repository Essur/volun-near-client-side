import React, { useState } from "react";

interface VolunteerEditFormProps {
    profileData: any;
    onClose: () => void;
    onUpdate: (updatedProfile: any) => void;
}

const VolunteerEditForm: React.FC<VolunteerEditFormProps> = ({ profileData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/v1/update/volunteer", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
                
                onClose(); 
            } else {
                alert("Failed to update profile.");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Volunteer Profile</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Save Changes</button>
        </form>
    );
};

const styles = {
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#ffffff", // White background for the form
        color: "#000000", // Black text color
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
        maxWidth: "90%",
    },
    closeButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: "5px",
        fontWeight: "bold",
        float: "right",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
};

export default VolunteerEditForm;
