import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, Input, Label, SimpleButton, SubTitle } from "../../styles/StyledComponents";

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
        <FormContainer onSubmit={handleSubmit}>
            <SubTitle>Edit Organization Profile</SubTitle>
            <Label>
                Organization Name:
                <Input
                    type="text"
                    name="nameOfOrganization"
                    value={formData.nameOfOrganization}
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
            <Label>
                Country:
                <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                City:
                <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                Address:
                <Input
                    type="text"
                    name="address"
                    value={formData.address}
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

export default OrganizationEditForm;
