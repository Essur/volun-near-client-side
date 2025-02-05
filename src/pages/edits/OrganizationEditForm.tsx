import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { updateOrganizationProfile } from "../../services/OrganizationService";
import { Error, FormContainer, Input, Label, SimpleButton, SubTitle } from "../../styles/GlobalStyledComponents";

interface OrganizationEditFormProps {
    profileData: {
        organizationResponseDTO: {
            email: string;
            nameOfOrganization: string;
            country: string;
            city: string;
            address: string;
        };
    };
    onClose: () => void;
}

interface FormInputs {
    email: string;
    nameOfOrganization: string;
    country: string;
    city: string;
    address: string;
}

const OrganizationEditForm: React.FC<OrganizationEditFormProps> = ({ profileData, onClose }) => {
    const { goTo } = useAppNavigation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            email: profileData.organizationResponseDTO.email,
            nameOfOrganization: profileData.organizationResponseDTO.nameOfOrganization,
            country: profileData.organizationResponseDTO.country,
            city: profileData.organizationResponseDTO.city,
            address: profileData.organizationResponseDTO.address,
        },
    });

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        try {
            await updateOrganizationProfile(formData);
            goTo(0);
            onClose();
        } catch {
            alert("Fail! Profile was not updated!");
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Edit Organization Profile</SubTitle>

            <Label>
                Organization Name:
                <Input
                    type="text"
                    {...register("nameOfOrganization", { required: "Organization name is required" })}
                />
                {errors.nameOfOrganization && <Error>{errors.nameOfOrganization.message}</Error>}
            </Label>

            <Label>
                Email:
                <Input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                    })}
                />
                {errors.email && <Error>{errors.email.message}</Error>}
            </Label>

            <Label>
                Country:
                <Input
                    type="text"
                    {...register("country", { required: "Country is required" })}
                />
                {errors.country && <Error>{errors.country.message}</Error>}
            </Label>

            <Label>
                City:
                <Input
                    type="text"
                    {...register("city", { required: "City is required" })}
                />
                {errors.city && <Error>{errors.city.message}</Error>}
            </Label>

            <Label>
                Address:
                <Input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                />
                {errors.address && <Error>{errors.address.message}</Error>}
            </Label>

            <SimpleButton type="submit">Save Changes</SimpleButton>
            <SimpleButton type="button" onClick={onClose}>Close</SimpleButton>
        </FormContainer>
    );
};

export default OrganizationEditForm;
