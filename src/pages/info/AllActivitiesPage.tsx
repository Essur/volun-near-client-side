import { useEffect, useState } from "react";
import { Activity } from "../../types/Types";
import { getAllActivities } from "../../services/ActivityService";
import { Error, SubTitle } from "../../styles/GlobalStyledComponents";
import { ActivityCard } from "../../components/ActivityCard";
import { PageContainer } from "../../styles/StyledActivitesList";


const AllActivitiesPage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[] | undefined>();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data: Activity[] = await getAllActivities();
                if (data.length === 0) {
                    setError("There is no activities on our database!")
                }
                setActivities(data);
            } catch (error: any) {
                setError(error);
            }
        }
        fetchActivities();
    }, []);

    if (error) {
        return <Error>{error}</Error>;
    }

    return (
        <>
            <SubTitle>Volunteering opportuinities</SubTitle>
            <PageContainer>
                {activities && activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </PageContainer>
        </>
    )
}

export default AllActivitiesPage;

