import React, { useContext, useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import OrganizationEditForm from "../edits/OrganizationEditForm";
import { Details, Error, SimpleButton, Strong, StyledList, StyledListItem, StyledText, SubTitle, Tag} from "../../styles/StyledComponents";
import { Activity } from "../../components/types";
import { EditModalContainer, ModalContent } from "../../styles/StyledContainers";

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
                console.log("Profile was successfully deleted!")
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
        console.log("Updated Profile:", updatedProfile);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <SubTitle>Organization profile</SubTitle>
            {error ? (
                <Error>{error}</Error>
            ) : profileData ? (
                <>
                    <Details>
                        <StyledText><Strong>{profileData.organizationResponseDTO.nameOfOrganization}</Strong></StyledText>
                        <StyledText><Strong>Country:</Strong> {profileData.organizationResponseDTO.country}</StyledText>
                        <StyledText><Strong>City:</Strong> {profileData.organizationResponseDTO.city}</StyledText>
                        <StyledText><Strong>Address:</Strong> {profileData.organizationResponseDTO.address}</StyledText>
                        <StyledText><Strong>Email:</Strong> {profileData.organizationResponseDTO.email}</StyledText>
                    </Details>

                    {profileData.activities.length > 0 && (
                        <>
                            <SubTitle>Activities</SubTitle>
                            <StyledList>
                                {profileData.activities.map((activity: Activity) => (
                                    <StyledListItem key={activity.id}>
                                        <StyledText><Strong>{activity.title}</Strong></StyledText>
                                        <StyledText><Strong>Location:</Strong> {activity.city}, {activity.country}</StyledText>
                                        <StyledText><Strong>Date:</Strong> {formatDate(activity.dateOfPlace)}</StyledText>
                                        <StyledText>{activity.description}</StyledText>
                                        <Tag>{activity.kindOfActivity}</Tag>
                                    </StyledListItem>
                                ))}
                            </StyledList>
                        </>
                    )}
                    <SimpleButton onClick={handleEdit}>
                        Edit Profile
                    </SimpleButton>
                    <SimpleButton onClick={removeProfile}>
                        Delete Profile
                    </SimpleButton>
                </>
            ) : (
                <>Loading profile data...</>
            )}

            {isEditModalOpen && (
                <EditModalContainer>
                    <ModalContent>
                        <OrganizationEditForm
                            profileData={profileData}
                            onClose={closeModal}
                            onUpdate={handleUpdate}
                        />
                    </ModalContent>
                </EditModalContainer>
            )}

        </>
    );
};


export default OrganizationProfilePage;
