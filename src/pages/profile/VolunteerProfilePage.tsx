import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPreferenceModal from "../../components/modal/AddPreferenceModal";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { addNewPreference, removePreference, removeVolunteerProfile } from "../../services/VolunteerService";
import { Details, Error, PreferenceList, PreferenceListItem, SimpleButton, Strong, StyledText, SubTitle } from "../../styles/StyledComponents";
import { EditModalContainer, ModalContent } from "../../styles/StyledContainers";
import VolunteerEditForm from "../edits/VolunteerEditForm";

const VolunteerProfilePage: React.FC = () => {
    const { profileData, error, updateProfile } = useProfile();
    const [showMenu, setShowMenu] = useState(false);
    const [newPreference, setNewPreference] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddPreference = async () => {
        addNewPreference(newPreference);
        updateProfile({
            ...profileData,
            preferences: [...profileData.preferences, newPreference],
        });
        setNewPreference("");
        setShowMenu(false);
        navigate(0);
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
            navigate("/");
        }, 1000);
    }

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
                        <StyledText><Strong>Preferences:</Strong></StyledText>
                        <PreferenceList>
                            {profileData.preferences.map((preference: { preferenceId: number; preferenceName: string }) => (
                                <PreferenceListItem key={preference.preferenceId}>
                                    {preference.preferenceName}
                                    <SimpleButton
                                        onClick={() => handleRemovePreference(preference.preferenceId)}
                                    >
                                        Remove
                                    </SimpleButton>
                                </PreferenceListItem>
                            ))}
                        </PreferenceList>
                        <SimpleButton onClick={() => setShowMenu(!showMenu)}>
                            Manage Preferences
                        </SimpleButton>
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

            <AddPreferenceModal
                isOpen={showMenu}
                newPreference={newPreference}
                setNewPreference={setNewPreference}
                onAdd={handleAddPreference}
                onClose={() => setShowMenu(false)}
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
