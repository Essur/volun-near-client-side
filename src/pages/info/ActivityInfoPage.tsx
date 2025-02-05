import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { ActivityInfo } from "../../types/Types";
import { getActivityInfo } from "../../services/ActivityService";
import { formatDate } from "../../services/utils/FormatDateService";
import { Loading, Tag } from "../../styles/GlobalStyledComponents";
import { MoreDetails } from "../../styles/StyledActivitesList";
import { ActivityContainer, ActivityDescription, ActivityDetails, ActivityTitle, InfoItem, InfoLink, InfoText, InfoTitle, StyledActivityInfo } from "../../styles/StyledActivityInfo";
import { getRole } from "../../services/utils/RoleService";

const ActivityInfoPage: React.FC = () => {
    const [activity, setActivity] = useState<ActivityInfo | null>();
    const { goToWithId } = useAppNavigation();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getActivityInfo(Number(id));
            if (data) {
                setActivity(data);
            }
        }
        fetchData();
    }, []);

    if (!activity) {
        return <Loading>Loading...</Loading>
    }

    return (
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
                { getRole() === "volunteer" && <InfoItem>
                    <MoreDetails>Join activity</MoreDetails>
                </InfoItem> }
                <InfoItem>
                    <MoreDetails onClick={() => goToWithId("/organization", activity.organizationId)}>Go to organization</MoreDetails>
                </InfoItem>
            </StyledActivityInfo>
        </ActivityContainer>
    );
};

export default ActivityInfoPage;