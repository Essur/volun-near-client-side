// RegistrationForm.tsx
import React, { useState } from "react";
import SubmitRegistration from "../../components/SubmitRegistration";

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
    <div>
      <h2>{variant === "volunteer" ? "Volunteer" : "Organization"} Registration</h2>
      <form>
        {variant === "volunteer" ? (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="nameOfOrganization"
              placeholder="Name of organization"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </>
        )}
      </form>
      <SubmitRegistration variant={variant} formData={formData} />
    </div>
  );
};

export default RegistrationForm;
