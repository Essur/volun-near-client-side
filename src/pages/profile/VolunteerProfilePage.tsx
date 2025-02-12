import React, { useContext, useEffect, useState } from "react";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { removeVolunteerProfile } from "../../services/VolunteerService";
import { Details, Error, SimpleButton, Strong, StyledText, SubTitle } from "../../styles/GlobalStyledComponents";
import { EditModalContainer, ModalContent } from "../../styles/GlobalStyledContainers";
import VolunteerEditForm from "../forms/edits/VolunteerEditForm";

const VolunteerProfilePage: React.FC = () => {
    const { profileData, error, fetchProfile } = useProfile();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const auth = useContext(AuthContext);
    const { goTo } = useAppNavigation();

    async function removeProfile(): Promise<void> {
        removeVolunteerProfile();
        setIsConfirmOpen(false);
        setTimeout(() => {
            auth?.logout();
            goTo("/");
        }, 1000);
    }

    useEffect(() => {
        if (!profileData) {
            fetchProfile();
        }
    })

    return (
        <>
            <SubTitle>Volunteer profile</SubTitle>
            {error ? (
                <Error>{error}</Error>
            ) : profileData ? (
                <>
                    <Details>
                        <StyledText><Strong>Email:</Strong> {profileData.email}</StyledText>
                        <StyledText><Strong>Username:</Strong> {profileData.username}</StyledText>
                        <StyledText><Strong>First Name:</Strong> {profileData.firstName}</StyledText>
                        <StyledText><Strong>Last Name:</Strong> {profileData.lastName}</StyledText>
                        <SimpleButton onClick={() => setIsEditModalOpen(true)}>
                            Edit Profile
                        </SimpleButton>
                        <SimpleButton onClick={() => setIsConfirmOpen(true)}>
                            Delete Profile
                        </SimpleButton>
                    </Details>
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
                        <VolunteerEditForm
                            profileData={profileData}
                            onClose={() => setIsEditModalOpen(false)}
                        />
                    </ModalContent>
                </EditModalContainer>
            )}
        </>
    );
};

export default VolunteerProfilePage;
