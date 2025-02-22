import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import FeedbackCreationForm from "../pages/forms/FeedbackCreationForm";
import { deleteFeedback, getFeedbackList, postFeedback, updateFeedback } from "../services/FeedbackService";
import { useAppNavigation } from "../services/utils/AppNavigation";
import { getRole } from "../services/utils/RoleService";
import { Actions, FeedbackCard, FeedbackContainer, FeedbackDescription, FeedbackHeader, FeedbackInput, RatingContainer, StarRatingContainer, UserName } from "../styles/StyledFeedbacks";
import { FeedbackInfo } from "../types/Types";
import ConfirmationModal from "./modal/ConfirmationModalWindow";
import NotificationModal from "./modal/NotificationModal";
import StarRating from "./StarRating";

interface FeedbackListProps {
    organizationId: number;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ organizationId }) => {
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: "",
        message: "",
    });
    const [feedbacks, setFeedbacks] = useState<FeedbackInfo[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [isComfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [editingFeedback, setEditingFeedback] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
    const [editedRating, setEditedRating] = useState<number>(0);
    const [feedbackId, setFeedbackId] = useState<number>(0);
    const { goTo } = useAppNavigation();

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


    const userFeedback = feedbacks.find(feedback => feedback.username === localStorage.getItem("username"));
    const canEditOrDelete = getRole() === "volunteer" && userFeedback !== undefined;

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <StarRatingContainer>
                {'★'.repeat(fullStars)}
                {'☆'.repeat(emptyStars)}
            </StarRatingContainer>
        );
    };

    const handleEditClick = (feedback: FeedbackInfo) => {
        setEditingFeedback(feedback.id);
        setEditedText(feedback.description);
        setEditedRating(feedback.rate);
    };

    const handleSave = async (feedbackId: number) => {
        await updateFeedback(feedbackId, organizationId, editedText, editedRating);
        setFeedbacks(prev =>
            prev.map(feedback => feedback.id === feedbackId ? { ...feedback, description: editedText, rate: editedRating } : feedback)
        );
        setEditingFeedback(null);
    };

    const handleCancel = () => {
        setEditingFeedback(null);
    };

    const handleDeleteFeedback = async (feedbackId: number) => {
        const response = await deleteFeedback(feedbackId);
        setNotification({
            isOpen: true,
            title: response === 200 ? "Feedback was removed" : "Feedback was not removed",
            message: response === 200 ? "Feedback was successfully removed!" : "Error happened, try to re-login"
        })
        if (response == 200) {
            setFeedbacks(prev => prev.filter(feedback => feedback.id !== feedbackId));
        }
    };

    const handleStarClick = (selectedRating: number) => {
        setEditedRating(selectedRating);
    };



    const handleSubmitFeedback = async (rating: number, description: string) => {
        const response = await postFeedback(organizationId, rating, description);
        setNotification({
            isOpen: true,
            title: response === 201 ? "Feedback was posted" : "Feedback was not posted",
            message: response === 201 ? "Feedback was successfully posted!" : "Error happened, try to re-login"
        })
    };

    return (
        <>
            <FeedbackContainer>
                {feedbacks.map(feedback => (
                    <FeedbackCard key={feedback.id}>
                        <FeedbackHeader>
                            <UserName>{feedback.realNameOfUser} ({feedback.username})</UserName>
                        </FeedbackHeader>

                        {editingFeedback === feedback.id ? (
                            <>
                                <RatingContainer>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarRating
                                            key={star}
                                            filled={star <= editedRating}
                                            onClick={() => handleStarClick(star)}
                                        />
                                    ))}
                                </RatingContainer>
                                <FeedbackInput value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                                <Actions>
                                    <FaCheck onClick={() => handleSave(feedback.id)} />
                                    <FaTimes onClick={handleCancel} />
                                </Actions>
                            </>
                        ) : (
                            <>
                                {renderStars(feedback.rate)}
                                <FeedbackDescription>{feedback.description}</FeedbackDescription>

                                {canEditOrDelete && feedback.username === localStorage.getItem("username") && (
                                    <Actions>
                                        <FaEdit onClick={() => handleEditClick(feedback)} />
                                        <FaTrash onClick={() => {
                                            setFeedbackId(feedback.id);
                                            setIsConfirmOpen(true);
                                        }} />
                                    </Actions>
                                )}
                            </>
                        )}
                    </FeedbackCard>
                ))}

                {getRole() === "volunteer" && !userFeedback &&
                    <FeedbackCreationForm onSubmit={handleSubmitFeedback} />}
            </FeedbackContainer>

            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onConfirm={() => {
                    setNotification({ isOpen: false, title: "", message: "" });
                    goTo(0);
                }}
            />

            <ConfirmationModal
                isOpen={isComfirmOpen}
                message={"You really want to remove your feedback?"}
                onConfirm={() => {
                    handleDeleteFeedback(feedbackId);
                    setIsConfirmOpen(false);
                }}
                onCancel={() => {
                    setFeedbackId(0);
                    setIsConfirmOpen(false);
                }} />
        </>
    );
};

export default FeedbackList;
