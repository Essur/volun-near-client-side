import React, { useContext, useEffect, useState } from "react";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";
import NotificationModal from "../../components/modal/NotificationModal";
import { AuthContext } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/ProfileContext";
import { removeOrganizationProfile } from "../../services/OrganizationService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import {
  Details,
  Error,
  SimpleButton,
  Strong,
  StyledText,
  SubTitle,
} from "../../styles/GlobalStyledComponents";
import {
  EditModalContainer,
  ModalContent,
} from "../../styles/GlobalStyledContainers";
import OrganizationEditForm from "../forms/edits/OrganizationEditForm";

const OrganizationProfilePage: React.FC = () => {
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (!profileData) fetchProfile();
  });

  return (
    <>
      <SubTitle>Organization profile</SubTitle>
      {error ? (
        <Error>{error}</Error>
      ) : profileData ? (
        <>
          <Details>
            <StyledText>
              <Strong>{profileData.nameOfOrganization}</Strong>
            </StyledText>
            <StyledText>
              <Strong>Country:</Strong> {profileData.country}
            </StyledText>
            <StyledText>
              <Strong>City:</Strong> {profileData.city}
            </StyledText>
            <StyledText>
              <Strong>Address:</Strong> {profileData.address}
            </StyledText>
            <StyledText>
              <Strong>Email:</Strong> {profileData.email}
            </StyledText>
          </Details>

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
    </>
  );
};

export default OrganizationProfilePage;
