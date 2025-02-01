import React, { CSSProperties, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import VolunteerEditForm from "../edits/VolunteerEditForm";
import { EditModalContainer, ModalContent } from "../../styles/StyledContainers";
import { Input, SimpleButton, SubTitle, Error, Details, StyledText, Strong, StyledList, StyledListItem, PreferenceListItem, PreferenceList } from "../../styles/StyledComponents";

const VolunteerProfilePage: React.FC = () => {
    const { profileData, error, updateProfile } = useProfile();
    const [showMenu, setShowMenu] = useState(false);
    const [newPreference, setNewPreference] = useState<string>("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddPreference = async () => {
        const role = localStorage.getItem("role");
        if (
            newPreference.trim() &&
            profileData &&
            role?.substring(6, role.length - 1).toLowerCase() === "volunteer"
        ) {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/volunteer/set_preferences",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                        },
                        body: JSON.stringify({ preferences: [newPreference] }),
                    }
                );

                if (response.ok) {
                    updateProfile({
                        ...profileData,
                        preferences: [...profileData.preferences, newPreference],
                    });
                    setNewPreference("");
                    console.log("Preference added successfully.");
                } else {
                    console.error("Failed to add preference.");
                }
            } catch (err) {
                console.error("Error adding preference:", err);
            }
        }
    };

    const handleRemovePreference = async (preferenceId: number) => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/volunteer/delete_preference",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                    body: JSON.stringify({ preferenceId }),
                }
            );

            if (response.ok) {
                updateProfile({
                    ...profileData,
                    preferences: profileData.preferences.filter(
                        (pref: { preferenceId: number }) => pref.preferenceId !== preferenceId
                    ),
                });
            } else {
                console.error("Failed to remove preference.");
            }
        } catch (err) {
            console.error("Error removing preference:", err);
        }
    };

    async function removeProfile(): Promise<void> {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/volunteer/delete_profile",
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
                    <SimpleButton onClick={() => removeProfile()}>
                        Delete Profile
                    </SimpleButton>
                    </Details>

                </>
            ) : (
                <>Loading profile data...</>
            )}

            {showMenu && (
                <EditModalContainer>
                    <ModalContent>
                        <SubTitle>Add preference</SubTitle>
                        <Input
                            type="text"
                            placeholder="Add a preference"
                            value={newPreference}
                            onChange={(e) => setNewPreference(e.target.value)}
                        />
                        <SimpleButton onClick={handleAddPreference}>
                            Add
                        </SimpleButton>
                        <SimpleButton>
                            Close
                        </SimpleButton>
                    </ModalContent>
                </EditModalContainer>
            )}

            {isEditModalOpen && (
                <EditModalContainer>
                    <ModalContent>
                        <VolunteerEditForm
                            profileData={profileData}
                            onClose={() => setIsEditModalOpen(false)}
                            onUpdate={(updatedProfile) => updateProfile(updatedProfile)}
                        />
                    </ModalContent>
                </EditModalContainer>
            )}
        </>
    );
};

export default VolunteerProfilePage;
