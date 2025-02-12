import { useEffect, useState } from "react";
import NotificationModal from "../../components/modal/NotificationModal";
import { cancelVolunteerActivityRequest, getVolunteerActivityRequestList } from "../../services/ActivityReqeustService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { ActivityTitle } from "../../styles/StyledActivityInfo";
import { ActivityItem, ActivityList, ButtonsContainer, DetailsButton, RequestCancelButton, RequestsContainer, VolunteerCard } from "../../styles/StyledRequestsList";
import { VolunteerActivityRequestForVolunteer } from "../../types/Types";

const VolunteerRequestsPage: React.FC = () => {
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [requests, setRequests] = useState<VolunteerActivityRequestForVolunteer[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const { goTo, goToWithId } = useAppNavigation();

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getVolunteerActivityRequestList();
            if (data == null) {
                setIsLoaded(false);
                return;
            }
            setIsLoaded(true)
            setRequests(data);
        };
        fetchRequests();
    }, []);


    function goToActivity(activityId: number): void {
        goToWithId("/activity", activityId);
    }

    async function cancelRequest(activityId: number, activityName: string): Promise<void> {
        const response = await cancelVolunteerActivityRequest(activityId);
        if (response == 200) {
            setNotification({
                isOpen: true,
                title: "Request was canceled",
                message: "Request for activity: \"" + activityName + "\" was successfully canceled"
            })
        }
    }

    return (
        <>
            <RequestsContainer>
                {isLoaded ? (
                    requests.map((activity) => (
                        <VolunteerCard key={activity.requestId}>
                            <ActivityList>
                                <ActivityItem>
                                    <ActivityTitle>{activity.activityName}</ActivityTitle>
                                    <ButtonsContainer>
                                        <DetailsButton onClick={() => goToActivity(activity.activityId)}>Details</DetailsButton>
                                        <RequestCancelButton onClick={() => cancelRequest(activity.activityId, activity.activityName)}>
                                            Cancel request
                                        </RequestCancelButton>
                                    </ButtonsContainer>
                                </ActivityItem>
                            </ActivityList>
                        </VolunteerCard>
                    ))
                ) : (
                    <div>No requests found!</div>
                )}
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
}

export default VolunteerRequestsPage;