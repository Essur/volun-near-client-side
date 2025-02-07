
import { useAppNavigation } from "../services/utils/AppNavigation";
import { formatDate } from "../services/utils/FormatDateService";
import { Card, Category, Date, Description, Location, MoreDetails, Title } from "../styles/StyledActivitesList";
import { Activity } from "../types/Types";

export const ActivityCard: React.FC<{ activity: Activity; children?: React.ReactNode }> = ({
    activity,
    children
}) => {
    const { goToWithId } = useAppNavigation();

    const getActivityInfo = (id: number) => {
        console.log(`Activity ID: ${id}`);
        goToWithId("/activity", id);
    }

    return (
        <Card>
            <Title>{activity.title}</Title>
            <Category>{activity.kindOfActivity}</Category>
            <Location>📍 {activity.city}, {activity.country}</Location>
            <Date>📅 {formatDate(activity.dateOfPlace)}</Date>
            <Description>{activity.description}</Description>
            <MoreDetails onClick={() => getActivityInfo(activity.id)}>More details ↗</MoreDetails>
            {children}
        </Card>
    );
};
