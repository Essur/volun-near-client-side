import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActivityCard } from "../../components/ActivityCard";
import FeedbackList from "../../components/FeedbackList";
import { getOrganizationInfo } from "../../services/OrganizationService";
import { Details, Loading, Strong, StyledText, SubTitle, Title } from "../../styles/GlobalStyledComponents";
import { MainContentContainer } from "../../styles/GlobalStyledContainers";
import { PageContainer } from "../../styles/StyledActivitesList";
import { Activity, OrganizationProfileData } from "../../types/Types";

const OrganizationInfoPage: React.FC = () => {
    const { id } = useParams();
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
            <MainContentContainer>
                <Title>{organization.organizationResponseDTO.nameOfOrganization}</Title>
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
        </>
    );
}

export default OrganizationInfoPage;