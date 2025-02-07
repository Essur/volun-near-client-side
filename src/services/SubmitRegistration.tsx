import { REGISTER_ORGANIZATION, REGISTER_VOLUNTEER } from "../config/ApiRoutes";
import { Variant } from "../pages/forms/RegistrationForm";

// services/SubmitRegistration.ts
interface SubmitRegistrationProps {
  variant: Variant;
  formData: { [key: string]: any };
}

const SubmitRegistration = async ({ variant, formData }: SubmitRegistrationProps) => {
  try {
    const endpoint = variant === "volunteer" ? REGISTER_VOLUNTEER : REGISTER_ORGANIZATION;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Registration successful: ", response.status);
      return { success: true, message: "Registration successful. Redirecting..." };
    } else if (response.status === 409) {
      console.log("Registration failed: ", response.status);
      return { success: false, message: "User already exists!" };
    } else {
      return { success: false, message: "An error occurred. Please try again." };
    }
  } catch (error) {
    console.error("Registration failed: ", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export default SubmitRegistration;
