import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrganizationProfileData } from "../../types/Types";
import { getOrganizationInfo } from "../../services/OrganizationService";
import { Details, Loading, Strong, StyledList, StyledListItem, StyledText, SubTitle, Tag, Title } from "../../styles/GlobalStyledComponents";
import { formatDate } from "../../services/utils/FormatDateService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { MoreDetails } from "../../styles/StyledActivitesList";

const OrganizationInfoPage: React.FC = () => {
    const { id } = useParams();
    const { goToWithId } = useAppNavigation();
    const [organization, setOrganization] = useState<OrganizationProfileData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrganizationInfo(Number(id));
            if (data) {
                setOrganization(data);
            }
        };

        fetchData();
    }, [id]);

    if (!organization) return <Loading>Loading...</Loading>;

    return (
        <>
            <Title>{organization.organizationResponseDTO.nameOfOrganization}</Title>
            <Details>
                <StyledText><Strong>Country:</Strong> {organization.organizationResponseDTO.country}</StyledText>
                <StyledText><Strong>City:</Strong> {organization.organizationResponseDTO.city}</StyledText>
                <StyledText><Strong>Address:</Strong> {organization.organizationResponseDTO.address}</StyledText>
                <StyledText><Strong>Email:</Strong> {organization.organizationResponseDTO.email}</StyledText>
            </Details>

            {organization.activities.length > 0 && (
                <>
                    <SubTitle>Activities</SubTitle>
                    <StyledList>
                        {organization.activities.map((activity) => (
                            <StyledListItem key={activity.id}>
                                <h3>{activity.title}</h3>
                                <StyledText><Strong>Location:</Strong> {activity.city}, {activity.country}</StyledText>
                                <StyledText><Strong>Date:</Strong> {formatDate(activity.dateOfPlace)}</StyledText>
                                <StyledText>{activity.description}</StyledText>
                                <Tag>{activity.kindOfActivity}</Tag>
                                <MoreDetails onClick={() => goToWithId("/activity", activity.id)}>Details</MoreDetails>
                            </StyledListItem>
                        ))}
                    </StyledList>
                </>
            )}
        </>
    );
}

export default OrganizationInfoPage;