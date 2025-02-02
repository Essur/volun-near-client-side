import React, { useContext, useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import OrganizationEditForm from "../edits/OrganizationEditForm";
import { Details, Error, SimpleButton, Strong, StyledList, StyledListItem, StyledText, SubTitle, Tag} from "../../styles/StyledComponents";
import { Activity } from "../../components/Types";
import { EditModalContainer, ModalContent } from "../../styles/StyledContainers";
import { removeOrganizationProfile } from "../../services/OrganizationService";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";

const OrganizationProfilePage: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { profileData, error } = useProfile();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    async function removeProfile(): Promise<void> {
        removeOrganizationProfile();
        setIsConfirmOpen(false);
        setTimeout(() => {
            auth?.logout();
            navigate("/");
        }, 2000);
    }

    const handleUpdate = (updatedProfile: any) => {
        console.log("Updated Profile:", updatedProfile);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    function addNewActivity(): void {
        
    }

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
                            <SimpleButton onClick={addNewActivity}>
                                Add new activity
                            </SimpleButton>
                        </>
                    )}
                    <SimpleButton onClick={() => setIsEditModalOpen(!isEditModalOpen)}>
                        Edit Profile
                    </SimpleButton>
                    <SimpleButton onClick={() => setIsConfirmOpen(true)}>
                        Delete Profile
                    </SimpleButton>
                </>
            ) : (
                <>Loading profile data...</>
            )}

            <ConfirmationModal
                isOpen={isConfirmOpen}
                title="Delete Profile"
                message="Are you sure you want to delete your profile? This action cannot be undone."
                onConfirm={removeProfile}
                onCancel={() => setIsConfirmOpen(false)}
            />

            {isEditModalOpen && (
                <EditModalContainer>
                    <ModalContent>
                        <OrganizationEditForm
                            profileData={profileData}
                            onClose={() => setIsEditModalOpen(!isEditModalOpen)}
                            onUpdate={handleUpdate}
                        />
                    </ModalContent>
                </EditModalContainer>
            )}

        </>
    );
};


export default OrganizationProfilePage;
