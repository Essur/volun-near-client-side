import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationModal from "../../components/modal/NotificationModal";
import { cancelVolunteerActivityRequest, getActivityInfo, getVolunteerActivityRequestStatus, joinVolunteerActivityRequest } from "../../services/ActivityService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { formatDate } from "../../services/utils/FormatDateService";
import { getRole } from "../../services/utils/RoleService";
import { Loading, Tag } from "../../styles/GlobalStyledComponents";
import { MoreDetails, RemoveButton } from "../../styles/StyledActivitesList";
import { ActivityContainer, ActivityDescription, ActivityDetails, ActivityTitle, InfoItem, InfoLink, InfoText, InfoTitle, StyledActivityInfo } from "../../styles/StyledActivityInfo";
import { ActivityInfo } from "../../types/Types";

const ActivityInfoPage: React.FC = () => {
    const [isStatusPresent, setIsStatusPresent] = useState<string | boolean |null>(false);
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [activity, setActivity] = useState<ActivityInfo | null>();
    const { goToWithId, goTo } = useAppNavigation();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getActivityInfo(Number(id));
            if (getRole() === "volunteer") {
                const response = await getVolunteerActivityRequestStatus(Number(id));
                if (response?.requestStatus === "PENDING" ) {
                   setIsStatusPresent("PENDING")
                } else if ( response?.requestStatus === "APPROVED") {
                    setIsStatusPresent("APPROVED");
                } else {
                    setIsStatusPresent(false);
                }
            }
            if (data) {
                setActivity(data);
            }
        }
        fetchData();
    }, [id]);

    if (!activity) {
        return <Loading>Loading...</Loading>
    }

    async function joinToActivityRequest(id: number): Promise<void> {
        const response = await joinVolunteerActivityRequest(id);
        setIsStatusPresent(response === 200 ? true : false);
        setNotification({
            isOpen: true,
            title: response === 200 ? "Request was sended" : "Request was not sended",
            message: response === 200 ? "Request was successfully sended, wait for response from organization" : "Error happened, try to re-login"
        })
    }

    async function cancelActivityRequest(id: number): Promise<void> {
        const response = await cancelVolunteerActivityRequest(id);
        if (response == 200) {
            setNotification({
                isOpen: true,
                title: "Request was removed",
                message: "Request was successfully removed!"
            })
        }
    }

    return (
        <>
            <ActivityContainer>
                {/* Left Side */}
                <ActivityDetails>
                    <ActivityTitle>{activity.title}</ActivityTitle>
                    <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityDetails>

                {/* Right Side */}
                <StyledActivityInfo>
                    <InfoItem>
                        <InfoTitle>Kind of activity</InfoTitle>
                        <Tag>{activity.kindOfActivity}</Tag>
                    </InfoItem>

                    <InfoItem>
                        <InfoTitle>📍 Location</InfoTitle>
                        <InfoText>{activity.city}, {activity.country}</InfoText>
                        <InfoLink href={`https://www.google.com/maps?q=${activity.city}`} target="_blank">Show on map</InfoLink>
                    </InfoItem>

                    {/* <InfoItem>
                    <InfoTitle>⏰ Working hours</InfoTitle>
                    <InfoText>{activity.workingHours}</InfoText>
                    </InfoItem>
                    
                    <InfoItem>
                    <InfoTitle>🎯 Skills requirement</InfoTitle>
                    <InfoText>{activity.skillsRequired}</InfoText>
                    </InfoItem>
                    
                    <InfoItem>
                    <InfoTitle>🔧 Experience requirement</InfoTitle>
                    <InfoText>{activity.experienceRequired}</InfoText>
                    </InfoItem> */}

                    <InfoItem>
                        <InfoTitle>📅 Date</InfoTitle>
                        <InfoText>{formatDate(activity.dateOfPlace)}</InfoText>
                    </InfoItem>
                    {getRole() === "volunteer" && isStatusPresent === false && <InfoItem>
                        <MoreDetails onClick={() => joinToActivityRequest(activity.id)}>Join activity</MoreDetails>
                    </InfoItem>}
                    {getRole() === "volunteer" && isStatusPresent === "PENDING" && <InfoItem>
                        <RemoveButton onClick={() => cancelActivityRequest(activity.id)}>Cancel my request</RemoveButton>
                    </InfoItem>}
                    <InfoItem>
                        <MoreDetails onClick={() => goToWithId("/organization", activity.organizationId)}>Go to organization</MoreDetails>
                    </InfoItem>
                </StyledActivityInfo>
            </ActivityContainer>

            {isStatusPresent &&
                <NotificationModal
                    isOpen={notification.isOpen}
                    title={notification.title}
                    message={notification.message}
                    onConfirm={() => {
                        setNotification({ isOpen: false, title: "", message: "" })
                        goTo(0)
                    }}
                />}
        </>
    );
};

export default ActivityInfoPage;
