import { useEffect, useState } from "react";
import NotificationModal from "../../components/modal/NotificationModal";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { StyledText } from "../../styles/GlobalStyledComponents";
import { AcceptButton, ActivityItem, ActivityList, ActivityTitle, ButtonsContainer, DetailsButton, EmailText, RequestsContainer, StyledVolunteerInfo, VolunteerCard } from "../../styles/StyledRequestsList";
import { VolunteerInfo, VolunteerRequestForOrganization } from "../../types/Types";
import { approveActivityRequest, getRequestListForOrganization } from "../../services/ActivityReqeustService";

const RequestsForOrganization: React.FC = () => {
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [requests, setRequests] = useState<VolunteerRequestForOrganization[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const { goTo, goToWithId } = useAppNavigation();

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getRequestListForOrganization();
            if (data == null) {
                setIsLoaded(false);
                return;
            }
            setIsLoaded(true)
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const groupedRequests = Object.values(
        requests.reduce((acc, request) => {
            const { email, firstName, lastName, username } = request.volunteerInfo;
            const key = email;

            if (!acc[key]) {
                acc[key] = {
                    volunteer: { email, firstName, lastName, username },
                    activities: []
                };
            }
            acc[key].activities.push({
                requestId: request.requestId,
                activityId: request.activityId,
                activityName: request.activityName
            });
            return acc;
        }, {} as Record<string, { volunteer: VolunteerInfo; activities: { requestId: number; activityId: number; activityName: string }[] }>)
    ).sort((a, b) => a.volunteer.lastName.localeCompare(b.volunteer.lastName));

    function goToActivity(activityId: number): void {
        goToWithId("/activity", activityId);
    }

    async function acceptRequest(requestId: number, username: string, activityTitle: string): Promise<void> {
        console.log(requestId);
        const response = await approveActivityRequest(requestId);
        if (response == 200) {
            setNotification({
                isOpen: true,
                title: "Activity request was approved",
                message: "Request for user with username: " + username + " for activity \"" + activityTitle + "\" was approved"
            })
        }
    }

    return (
        <>
            <RequestsContainer>
                {isLoaded == true && Object.values(groupedRequests).map(({ volunteer, activities }) => (
                    <VolunteerCard key={volunteer.email}>
                        <StyledVolunteerInfo>
                            {volunteer.firstName} {volunteer.lastName} ({volunteer.username})
                        </StyledVolunteerInfo>
                        <EmailText>{volunteer.email}</EmailText>
                        <ActivityList>
                            {activities.map((activity) => (
                                <ActivityItem>
                                    <ActivityTitle>{activity.activityName}</ActivityTitle>
                                    <ButtonsContainer>
                                        <DetailsButton onClick={() => goToActivity(activity.activityId)}>Details</DetailsButton>
                                        <AcceptButton onClick={() => acceptRequest(activity.requestId, volunteer.username, activity.activityName)}>Accept request</AcceptButton>
                                    </ButtonsContainer>
                                </ActivityItem>
                            ))}
                        </ActivityList>
                    </VolunteerCard>
                ))}
                {isLoaded == false && <StyledText>Here is no requests for you!</StyledText>}
            </RequestsContainer>

            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onConfirm={() => {
                    setNotification({ isOpen: false, title: "", message: "" })
                    goTo(0)
                }}
            />
        </>
    );
};

export default RequestsForOrganization;
