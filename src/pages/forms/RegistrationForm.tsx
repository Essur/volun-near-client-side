import React, { useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CountryInputField from "../../components/CountryInputField";
import SubmitRegistration from "../../services/SubmitRegistration";
import { ErrorText, FormContainer, Input, SimpleButton, SubTitle } from "../../styles/GlobalStyledComponents";
import { OrganizationInputs, VolunteerInputs } from "../../types/Types";

export type Variant = "volunteer" | "organization";

interface RegistrationFormProps {
  variant: Variant;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ variant }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<VolunteerInputs | OrganizationInputs>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    reset();
  }, [variant, reset]);

  const onSubmit: SubmitHandler<VolunteerInputs | OrganizationInputs> = async (data) => {
    const response = await SubmitRegistration({ variant, formData: data });

    if (response.success) {
      setMessage(response.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setMessage(response.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <SubTitle>{variant === "volunteer" ? "Volunteer" : "Organization"} Registration</SubTitle>

      {variant === "volunteer" ? (
        <>
          <Input type="text" placeholder="First Name" {...register("firstName", { required: "First name is required" })} />
          {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}

          <Input type="text" placeholder="Last Name" {...register("lastName", { required: "Last name is required" })} />
          {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}

          <Input type="email" placeholder="Email" {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email format" } })} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
          {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

          <Input type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </>
      ) : (
        <>
          <Input type="text" placeholder="Organization Name" {...register("nameOfOrganization", { required: "Organization name is required" })} />
          {errors.nameOfOrganization && <ErrorText>{errors.nameOfOrganization.message}</ErrorText>}

          <CountryInputField register={register as UseFormRegister<OrganizationInputs>} errors={errors as FieldErrors<OrganizationInputs>} setValue={setValue as UseFormSetValue<OrganizationInputs>} />

          <Input type="text" placeholder="City" {...register("city", { required: "City is required" })} />
          {errors.city && <ErrorText>{errors.city.message}</ErrorText>}

          <Input type="text" placeholder="Address" {...register("address", { required: "Address is required" })} />
          {errors.address && <ErrorText>{errors.address.message}</ErrorText>}

          <Input type="email" placeholder="Email" {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email format" } })} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
          {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

          <Input type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </>
      )}

      {/* SimpleButton triggers onSubmit manually */}
      <SimpleButton type="submit">
        Register
      </SimpleButton>

      {message && <p>{message}</p>}
    </FormContainer>
  );
};

export default RegistrationForm;
