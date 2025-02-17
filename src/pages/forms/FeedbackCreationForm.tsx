import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorText, ThirdTitle } from "../../styles/GlobalStyledComponents";
import { FeedbackFormContainer, FeedbackInput, RatingContainer, SubmitButton } from "../../styles/StyledFeedbacks";
import StarRating from "../../components/StarRating";

const FeedbackCreationForm: React.FC<{ onSubmit: (rating: number, description: string) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState<number>(0);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: "",
        },
    });

    const onSubmitForm = ({ description }: { description: string }) => {
        if (rating === 0) {
            alert("Please select a rating before submitting.");
            return;
        }
        onSubmit(rating, description);
        setRating(0);
        setValue("description", "");
    };

    return (
        <FeedbackFormContainer onSubmit={handleSubmit(onSubmitForm)}>
            <ThirdTitle>Give feedback:</ThirdTitle>
            <RatingContainer>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarRating key={star} filled={star <= rating} onClick={() => setRating(star)} />
                ))}
            </RatingContainer>
            <FeedbackInput
                {...register("description", { required: "Feedback is required." })}
                placeholder="Write your feedback here..."
                />
            {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
            <SubmitButton type="submit">Submit Feedback</SubmitButton>
        </FeedbackFormContainer>
    );
};

export default FeedbackCreationForm;
