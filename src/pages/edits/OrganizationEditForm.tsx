import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrganizationEditFormProps {
    profileData: any; 
    onClose: () => void;
    onUpdate: (updatedProfile: any) => void;
}

const OrganizationEditForm: React.FC<OrganizationEditFormProps> = ({ profileData, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: profileData.organizationResponseDTO.email,
        nameOfOrganization: profileData.organizationResponseDTO.nameOfOrganization,
        country: profileData.organizationResponseDTO.country,
        city: profileData.organizationResponseDTO.city,
        address: profileData.organizationResponseDTO.address,
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
            const response = await fetch(
                "http://localhost:8080/api/v1/update/organization",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert("Organization profile updated successfully!");
                navigate(0);
                onClose();
            } else {
                alert("Failed to update organization profile.");
            }
        } catch (err) {
            console.error("Error updating organization profile:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.modalContent}>
            <h2>Edit Organization Profile</h2>
            <label>
                Organization Name:
                <input
                    type="text"
                    name="nameOfOrganization"
                    value={formData.nameOfOrganization}
                    onChange={handleChange}
                    style={styles.input}
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
                    style={styles.input}
                />
            </label>
            <br />
            <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    style={styles.input}
                />
            </label>
            <br />
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={styles.input}
                />
            </label>
            <br />
            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={styles.input}
                />
            </label>
            <br />
            <button type="submit" style={styles.button}>
                Save Changes
            </button>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#ffffff",
        color: "#000000",
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

export default OrganizationEditForm;
