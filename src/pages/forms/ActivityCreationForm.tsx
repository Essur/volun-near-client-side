import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountryInputField from "../../components/CountryInputField";
import NotificationModal from "../../components/modal/NotificationModal";
import { createActivity } from "../../services/ActivityService";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { Input, SimpleButton, Title, Error } from "../../styles/GlobalStyledComponents";
import { ActivityFormCreationContainer, TextArea } from "../../styles/StyledForm";
import { ActivityRequest } from "../../types/Types";

const ActivityCreationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ActivityRequest>();
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [title, setTitle] = useState<string | null>();
    const { goTo } = useAppNavigation();


    const onSubmit = async (data: ActivityRequest) => {
        const response = await createActivity(data);
        setTitle(data.title);
        if (response == 200) {
            return setIsCreated(true);
        }
        else setIsCreated(false);
    };

    return (
        <>
            <Title>Create New Activity</Title>
            <ActivityFormCreationContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        placeholder="Activity title"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <Error>{errors.title.message}</Error>}

                    <Input
                        type="text"
                        placeholder="City"
                        {...register("city", { required: "City is required" })}
                        list="cities"
                    />
                    {errors.city && <Error>{errors.city.message}</Error>}

                    <CountryInputField register={register} errors={errors} setValue={setValue} />

                    <TextArea
                        placeholder="Activity description"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <Error>{errors.description.message}</Error>}

                    <Input
                        type="text"
                        placeholder="Kind of activity"
                        {...register("kindOfActivity", { required: "Kind of Activity is required" })}
                    />
                    {errors.kindOfActivity && <Error>{errors.kindOfActivity.message}</Error>}

                    <SimpleButton type="submit">Create Activity</SimpleButton>
                    <SimpleButton onClick={() => goTo(-1)}>Go back</SimpleButton>
                </form>
            </ActivityFormCreationContainer>

            <NotificationModal
                isOpen={isCreated}
                title="Activity was created"
                message={"Actviity with title " + title + " was created ✅️"}
                onConfirm={() => {
                    setIsCreated(false);
                    goTo("/organization-profile")
                }}
            />
        </>
    );
};

export default ActivityCreationForm;
