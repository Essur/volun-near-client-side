import { useEffect, useState } from "react";
import { deleteActivity, fetchMyActivitiesForOrganization } from "../../services/ActivityService";
import { Activity } from "../../types/Types";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import NotificationModal from "../../components/modal/NotificationModal";
import { ActivityCard } from "../../components/ActivityCard";
import { SubTitle, SimpleButton, ErrorText } from "../../styles/GlobalStyledComponents";
import { ModalOverlay, ModalContent } from "../../styles/GlobalStyledContainers";
import { PageContainer, EditButton, RemoveButton } from "../../styles/StyledActivitesList";
import ActivityEditForm from "../forms/edits/ActivityEditForm";

const OrganizationActivitiesManagePage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [editActivity, setEditActivity] = useState<Activity | null>(null);
    const [error, setError] = useState<string | null>();
    const { goTo } = useAppNavigation();
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });

    useEffect(() => {
        const fetchMyActivities = async () => {
            const response: Activity[] = await fetchMyActivitiesForOrganization();
            if (response.length === 0) {
                setError("There is no activities in your profile");
            }
            setActivities(response);
        }
        fetchMyActivities();
    }, []);

    function addNewActivity(): void {
        goTo("/create-activity");
    }

    async function handleDeleteActviity(id: number): Promise<void> {
        const response = await deleteActivity(id);
        setNotification({
            isOpen: true,
            title: response === 200 ? "Activity was deleted" : "Failed to delete",
            message: response === 200 ? "Activity was successfully deleted" : "Something went wrong. Try again.",
        });
    }

    if (error) {
        return <ErrorText>{error}</ErrorText>;
    }

    return (
        <>

            {activities.length > 0 && (
                <>
                    <SubTitle>Activities</SubTitle>
                    <PageContainer>
                        {activities.map((activity: Activity) => (
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
            <SimpleButton onClick={() => goTo("/organization-profile")}>
                Back to profile
            </SimpleButton>

            {editActivity && (
                <ModalOverlay>
                    <ModalContent>
                        <ActivityEditForm activity={editActivity} onClose={() => setEditActivity(null)} />
                    </ModalContent>
                </ModalOverlay>
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
        </>
    );
}

export default OrganizationActivitiesManagePage;