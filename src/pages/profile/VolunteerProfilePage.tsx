import React, { useContext, useEffect, useState } from "react";
import AddPreferenceModal from "../../components/modal/AddPreferenceModal";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { addNewPreference, removePreference, removeVolunteerProfile } from "../../services/VolunteerService";
import { Details, Error, PreferenceList, PreferenceListItem, SimpleButton, Strong, StyledText, SubTitle } from "../../styles/GlobalStyledComponents";
import { EditModalContainer, ModalContent } from "../../styles/GlobalStyledContainers";
import VolunteerEditForm from "../forms/edits/VolunteerEditForm";

const VolunteerProfilePage: React.FC = () => {
    const { profileData, error, updateProfile, fetchProfile } = useProfile();
    const [showMenu, setShowMenu] = useState(false);
    const [newPreference, setNewPreference] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const auth = useContext(AuthContext);
    const { goTo } = useAppNavigation();

    const handleAddPreference = async () => {
        addNewPreference(newPreference);
        updateProfile({
            ...profileData,
            preferences: [...profileData.preferences, newPreference],
        });
        setNewPreference("");
        setShowMenu(false);
        goTo(0);
    };

    const handleRemovePreference = async (preferenceId: number) => {
        removePreference(preferenceId);
        updateProfile({
            ...profileData,
            preferences: profileData.preferences.filter(
                (pref: { preferenceId: number }) => pref.preferenceId !== preferenceId
            ),
        });
    };

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
                        {/* <SimpleButton onClick={() => setShowMenu(!showMenu)}> */}
                        {/*     Manage Preferences */}
                        {/* </SimpleButton> */}
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

            {/* <AddPreferenceModal */}
            {/*     isOpen={showMenu} */}
            {/*     newPreference={newPreference} */}
            {/*     setNewPreference={setNewPreference} */}
            {/*     onAdd={handleAddPreference} */}
            {/*     onClose={() => setShowMenu(false)} */}
            {/* /> */}

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
