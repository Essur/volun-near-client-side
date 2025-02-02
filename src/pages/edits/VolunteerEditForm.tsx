import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, Input, Label, SimpleButton, SubTitle } from "../../styles/StyledComponents";

interface VolunteerEditFormProps {
    profileData: any;
    onClose: () => void;
    onUpdate: (updatedProfile: any) => void;
}

const VolunteerEditForm: React.FC<VolunteerEditFormProps> = ({ profileData, onClose }) => {
    const navigate = useNavigate();
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
                navigate(0)
                onClose(); 
            } else {
                alert("Failed to update profile.");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <SubTitle>Edit Volunteer Profile</SubTitle>
            <Label>
                First Name:
                <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                Last Name:
                <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                Email:
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Label>
            <SimpleButton type="submit">
                Save Changes
            </SimpleButton>
            <SimpleButton onClick={onClose}>
                Close
            </SimpleButton>
        </FormContainer>
    );
};

export default VolunteerEditForm;
