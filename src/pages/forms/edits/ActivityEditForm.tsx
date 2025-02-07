import { SubmitHandler, useForm } from "react-hook-form";
import { useAppNavigation } from "../../../services/utils/AppNavigation";
import { Activity } from "../../../types/Types";
import { ErrorText, FormContainer, Input, SimpleButton } from "../../../styles/GlobalStyledComponents";
import { TextArea } from "../../../styles/StyledForm";
import { updateActivityInfo } from "../../../services/ActivityService";
import { useState } from "react";
import NotificationModal from "../../../components/modal/NotificationModal";

interface ActivityFormProps {
    activity: Activity;
    onClose: () => void;
}

interface FormInputs {
    title: string;
    description: string;
    city: string;
    country: string;
    dateOfPlace: string;
    kindOfActivity: string;
}

const ActivityEditForm: React.FC<ActivityFormProps> = ({ activity, onClose }) => {
    const { goTo } = useAppNavigation();
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            title: activity.title,
            description: activity.description,
            city: activity.city,
            country: activity.country,
            dateOfPlace: activity.dateOfPlace,
            kindOfActivity: activity.kindOfActivity
        },
    });
    
    const onSubmit: SubmitHandler<FormInputs> = async (formData) =>{
        try {
            const response = await updateActivityInfo(formData, activity.id);
            if (response == 200){
                setIsUpdated(true);
                onClose();
            } else {
                setIsUpdated(false);
                onClose();
            }

        } catch (err: any) {
            
        }
    }

    return (
        <>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Title"
                    {...register("title", {required: "Title could not be empty!"})}
                />
                {errors.title && <ErrorText>errors.title.message</ErrorText>}
                
                <TextArea
                    placeholder="Description"
                    {...register("description", {required: "Description could not be empty!"})}
                />
                {errors.description && <ErrorText>errors.description.message</ErrorText>}


                <Input
                    type="text"
                    placeholder="City"
                    {...register("city", {required: "City could not be empty!"})}
                />
                {errors.title && <ErrorText>errors.city.message</ErrorText>}

                
                <Input
                    type="text"
                    placeholder="Country"
                    {...register("country", {required: "Country could not be empty!"})}
                />
                {errors.title && <ErrorText>errors.country.message</ErrorText>}

                <Input
                    type="text"
                    placeholder="Kind of activity"
                    {...register("kindOfActivity", {required: "Kind of activity could not be empty!"})}
                />
                {errors.title && <ErrorText>errors.kindOfActivity.message</ErrorText>}

                <SimpleButton type="submit">Save</SimpleButton>
                <SimpleButton onClick={onClose}>Cancel</SimpleButton>
            </FormContainer>

            <NotificationModal
                    isOpen={isUpdated}
                    title="Activity was updated"
                    message={"Actviity with title " + activity.title + " was updated ✅️"}
                    onConfirm={() => {
                        setIsUpdated(false);
                        goTo(0);
                    }}
                />
        </>
    );
};

export default ActivityEditForm;