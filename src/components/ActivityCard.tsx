
import { formatDate } from "../services/utils/FormatDateService";
import { Card, Category, Title, Location, Description, MoreDetails } from "../styles/StyledActivitesList";
import { Activity } from "../types/Types";
import { useNavigate } from "react-router-dom";

export const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
    const navigate = useNavigate();

    const getActivityInfo = (id: number) => {
        console.log(`Activity ID: ${id}`);
        navigate(`/activity/${id}`)
    }

    return (
        <Card>
            <Title>{activity.title}</Title>
            <Category>{activity.kindOfActivity}</Category>
            <Location>📍 {activity.city}, {activity.country}</Location>
            <Date>📅 { formatDate(activity.dateOfPlace) }</Date>
            <Description>{activity.description}</Description>
            <MoreDetails onClick={() => getActivityInfo(activity.id)}>More details ↗</MoreDetails>
        </Card>
    );
};
