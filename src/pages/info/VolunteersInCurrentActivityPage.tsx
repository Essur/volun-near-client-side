import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVolunteersForActivty, kickVolunteerFromActivity } from "../../services/ActivityService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { SimpleButton } from "../../styles/GlobalStyledComponents";
import { VolunteerCard } from "../../styles/StyledRequestsList";
import { DateOfEntrance, KickButton, VolunteerEmail, VolunteerName, VolunteersContainer } from "../../styles/StyledVolunteersListInActivity";
import { VolunteerInActivityInfo } from "../../types/Types";
import { formatDate } from "../../services/utils/FormatDateService";
import NotificationModal from "../../components/modal/NotificationModal";

const VolunteersInCurrentActivityPage: React.FC = () => {
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [volunteers, setVolunteers] = useState<VolunteerInActivityInfo[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { goTo } = useAppNavigation();
    const { id } = useParams();

    useEffect(() => {
        const fetchVolunteers = async () => {
            const data = await getVolunteersForActivty(Number(id));
            if (data) {
                setVolunteers(data);
                setIsLoaded(true);
            } else {
                setIsLoaded(false);
            }
        };
        fetchVolunteers();
    }, []);

    const kickVolunteer = async (username: string) => {
        const response = await kickVolunteerFromActivity(username, Number(id));
            setNotification({
                isOpen: true,
                title: response === 200 ? "Volunteer was removed from activity" : "Volunteer was not removed from activity",
                message: response === 200 ? "Volunteer with username \"" + username + "\" was removed" : "Error happened, volunteer was not kicked from activity, try re-login"
            })
    };

    return (
        <>
            <SimpleButton onClick={() => goTo(-1)}>Go back</SimpleButton>
            <VolunteersContainer>
                {isLoaded ? (
                    volunteers.map((volunteer) => (
                        <VolunteerCard key={volunteer.email}>
                            <div>
                                <VolunteerName>{volunteer.firstName} {volunteer.lastName} ({volunteer.username})</VolunteerName>
                                <DateOfEntrance>Joined on: {formatDate(volunteer.acceptedDate)}</DateOfEntrance>
                                <VolunteerEmail>{volunteer.email}</VolunteerEmail>
                            </div>
                            <KickButton onClick={() => kickVolunteer(volunteer.username)}>Kick Volunteer</KickButton>
                        </VolunteerCard>
                    ))
                ) : (
                    <p>There is no volunteers in that activity</p>
                )}
            </VolunteersContainer>
            
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

export default VolunteersInCurrentActivityPage;
