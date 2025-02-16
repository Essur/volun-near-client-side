import { useEffect, useState } from "react";
import { getFeedbackList } from "../services/FeedbackService";
import { ThirdTitle } from "../styles/GlobalStyledComponents";
import { Description } from "../styles/StyledActivitesList";
import { AverageRating, FeedbackCard, FeedbackContainer, FeedbackHeader, Rating, Star, StarRating, UserName } from "../styles/StyledFeedbacks";
import { FeedbackInfo } from "../types/Types";

interface FeedbackListProps {
    organizationId: number;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ organizationId }) => {
    const [feedbacks, setFeedbacks] = useState<FeedbackInfo[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const formattedRating = averageRating % 1 === 0 ? averageRating.toFixed(0) : averageRating.toFixed(1);


    useEffect(() => {
        const fetchFeedbacks = async () => {
            const data = await getFeedbackList(organizationId);
            if (data && data.length > 0) {
                setFeedbacks(data);
                setIsLoaded(true);

                const avg = data.reduce((sum, f) => sum + f.rate, 0) / data.length;
                setAverageRating(avg);
            } else {
                setIsLoaded(false);
            }
        };
        fetchFeedbacks();
    }, [organizationId]);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <StarRating>
                {'★'.repeat(fullStars)}
                {halfStar ? '½' : ''}
                {'☆'.repeat(emptyStars)}
            </StarRating>
        );
    };

    return (
        <FeedbackContainer>
            <AverageRating>
                Average Rating: <Star>{renderStars(averageRating)}</Star> ({formattedRating}/5)
            </AverageRating>
            {isLoaded ? (
                feedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id}>
                        <FeedbackHeader>
                            <UserName>{feedback.realNameOfUser} (@{feedback.username})</UserName>
                            {renderStars(feedback.rate)}
                        </FeedbackHeader>
                        <Description>{feedback.description}</Description>
                    </FeedbackCard>
                ))
            ) : (
                <ThirdTitle>For now, there is no feedbacks for that organization</ThirdTitle>
            )}
        </FeedbackContainer>
    );
};

export default FeedbackList;
