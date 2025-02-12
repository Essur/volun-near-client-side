import React, { useContext, useEffect, useState } from "react";
import { ActivityCard } from "../../components/ActivityCard";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { removeOrganizationProfile } from "../../services/OrganizationService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { Details, Error, SimpleButton, Strong, StyledText, SubTitle } from "../../styles/GlobalStyledComponents";
import { EditModalContainer, ModalContent, ModalOverlay } from "../../styles/GlobalStyledContainers";
import { EditButton, PageContainer, RemoveButton } from "../../styles/StyledActivitesList";
import { Activity } from "../../types/Types";
import { deleteActivity } from "../../services/ActivityService";
import NotificationModal from "../../components/modal/NotificationModal";
import OrganizationEditForm from "../forms/edits/OrganizationEditForm";
import ActivityEditForm from "../forms/edits/ActivityEditForm";

const OrganizationProfilePage: React.FC = () => {
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [editActivity, setEditActivity] = useState<Activity | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const { profileData, error, fetchProfile } = useProfile();
    const auth = useContext(AuthContext);
    const { goTo } = useAppNavigation();

    async function removeProfile(): Promise<void> {
        removeOrganizationProfile();
        setIsConfirmOpen(false);
        setTimeout(() => {
            auth?.logout();
            goTo("/");
        }, 2000);
    }

    function addNewActivity(): void {
        goTo("/create-activity");
    }

    useEffect(() => {
        if (!profileData)
            fetchProfile();
    })

    async function handleDeleteActviity(id: number): Promise<void> {
        const response = await deleteActivity(id);
        setNotification({
            isOpen: true,
            title: response === 200 ? "Activity was deleted" : "Failed to delete",
            message: response === 200 ? "Activity was successfully deleted" : "Something went wrong. Try again.",
        });
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
                            <PageContainer>
                                {profileData.activities.map((activity: Activity) => (
                                    <ActivityCard key={activity.id} activity={activity}>
                                        <EditButton onClick={() => setEditActivity(activity)}>Edit activity</EditButton>
                                        <RemoveButton onClick={() => handleDeleteActviity(activity.id)}>Close activity</RemoveButton>
                                    </ActivityCard>
                                ))}
                            </PageContainer>
                        </>
                    )}
                    <SimpleButton onClick={addNewActivity}>
                        Add new activity
                    </SimpleButton>
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

            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onConfirm={() => {
                    setNotification({ isOpen: false, title: "", message: "" });
                    goTo(0);
                }}
            />
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
                        />
                    </ModalContent>
                </EditModalContainer>
            )}

            {editActivity && (
                <ModalOverlay>
                    <ModalContent>
                        <ActivityEditForm activity={editActivity} onClose={() => setEditActivity(null)} />
                    </ModalContent>
                </ModalOverlay>
            )}

        </>
    );
};


export default OrganizationProfilePage;
