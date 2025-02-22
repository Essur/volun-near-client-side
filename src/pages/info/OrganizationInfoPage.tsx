import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActivityCard } from "../../components/ActivityCard";
import FeedbackList from "../../components/FeedbackList";
import NotificationBell from "../../components/NotificationBell";
import { getNotificationSubscriptionStatus, subscribeToOrganizationNotification, unsubscribeFromOrganizationNotification } from "../../services/NotificationService";
import { getOrganizationInfo } from "../../services/OrganizationService";
import { getRole } from "../../services/utils/RoleService";
import { Details, Loading, Strong, StyledText, SubTitle, Title } from "../../styles/GlobalStyledComponents";
import { MainContentContainer } from "../../styles/GlobalStyledContainers";
import { PageContainer } from "../../styles/StyledActivitesList";
import { Activity, OrganizationProfileData } from "../../types/Types";
import NotificationModal from "../../components/modal/NotificationModal";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import ConfirmationModal from "../../components/modal/ConfirmationModalWindow";

const OrganizationInfoPage: React.FC = () => {
    const { id } = useParams();
    const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(false);
    const [organization, setOrganization] = useState<OrganizationProfileData | null>(null);
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const { goTo } = useAppNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrganizationInfo(Number(id));
            if (data) {
                setOrganization(data);
            }
            if (getRole() === "volunteer") {
                const response = await getNotificationSubscriptionStatus(Number(id));
                response === 200 ? setSubscriptionStatus(true) : setSubscriptionStatus(false);
            }
        };

        fetchData();
    }, [id]);

    if (!organization) return <Loading>Loading...</Loading>;


    const handleClick = async () => {
        if (subscriptionStatus === true) {
            setIsConfirmOpen(true);
        } else if (subscriptionStatus === false) {
            const response = await subscribeToOrganizationNotification(Number(id));
            if (response !== 200) {
                setNotification({
                    isOpen: true,
                    title: "Subscription failed",
                    message: "Subscription failed, try re-login"
                })
            }
            setSubscriptionStatus((prev) => !prev);
        }
    }

    const handleUnsubscribe = async () => {
        const repsponse = await unsubscribeFromOrganizationNotification(Number(id));
        setIsConfirmOpen(false);
        if (repsponse === 200) { setSubscriptionStatus((prev) => !prev); }
    }

    return (
        <>
            <MainContentContainer>
                <Title>{organization.organizationResponseDTO.nameOfOrganization}</Title>
                <NotificationBell isSubscribed={subscriptionStatus} onToggle={handleClick} />
                <Details>
                    <StyledText><Strong>Country:</Strong> {organization.organizationResponseDTO.country}</StyledText>
                    <StyledText><Strong>City:</Strong> {organization.organizationResponseDTO.city}</StyledText>
                    <StyledText><Strong>Address:</Strong> {organization.organizationResponseDTO.address}</StyledText>
                    <StyledText><Strong>Email:</Strong> {organization.organizationResponseDTO.email}</StyledText>
                </Details>
            </MainContentContainer>

            {organization.activities.length > 0 && (
                <>
                    <SubTitle>Activities</SubTitle>
                    <PageContainer>
                        {organization.activities.map((activity: Activity) => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </PageContainer>
                </>
            )}

            <>
                <SubTitle>Feedbacks</SubTitle>
                <FeedbackList organizationId={organization.organizationResponseDTO.id} />
            </>

            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onConfirm={() => {
                    setNotification({ isOpen: false, title: "", message: "" })
                    goTo(0)
                }}
            />
            <ConfirmationModal
                isOpen={isConfirmOpen}
                title="Unsubscribe?"
                message="Are you sure you want to unsubscribe from notifications? You can miss something intresting"
                onConfirm={handleUnsubscribe}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </>
    );
}

export default OrganizationInfoPage;
