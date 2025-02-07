import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppNavigation } from "../../../services/utils/AppNavigation";
import { updateVolunteerProfile } from "../../../services/VolunteerService";
import { ErrorText, FormContainer, Input, SimpleButton, SubTitle } from "../../../styles/GlobalStyledComponents";


interface VolunteerEditFormProps {
    profileData: {
        firstName: string;
        lastName: string;
        email: string;
    };
    onClose: () => void;
}

interface FormInputs {
    firstName: string;
    lastName: string;
    email: string;
}

const VolunteerEditForm: React.FC<VolunteerEditFormProps> = ({ profileData, onClose }) => {
    const { goTo } = useAppNavigation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
        },
    });

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        try {
            await updateVolunteerProfile(formData);
            goTo(0)
            onClose();
        } catch (err: any) {
            alert("Fail! Profile was not updated");
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Edit Profile</SubTitle>

            <Input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}

            <Input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}

            <Input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

            <SimpleButton type="submit">Save Changes</SimpleButton>
            <SimpleButton type="button" onClick={onClose}>Cancel</SimpleButton>
        </FormContainer>
    );
};

export default VolunteerEditForm;
