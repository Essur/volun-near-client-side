// RegistrationForm.tsx
import React, { useState } from "react";
import SubmitRegistration from "../../services/SubmitRegistration";
import { FormContainer, Input, SubTitle } from "../../styles/StyledComponents";

export type Variant = "volunteer" | "organization";

interface RegistrationFormProps {
  variant: Variant;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ variant }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <SubTitle>{variant === "volunteer" ? "Volunteer" : "Organization"} registration</SubTitle>
        {variant === "volunteer" ? (
          <FormContainer>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </FormContainer>
        ) : (
          <FormContainer>
            <Input
              type="text"
              name="nameOfOrganization"
              placeholder="Name of organization"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </FormContainer>
        )}
      <SubmitRegistration variant={variant} formData={formData} />
    </>
  );
};

export default RegistrationForm;
