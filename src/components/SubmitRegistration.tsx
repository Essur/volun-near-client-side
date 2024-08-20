// SubmitRegistration.tsx
import React from "react";
import axios from "axios";
import { Variant } from "./RegistrationForm";

interface SubmitRegistrationProps {
  variant: Variant;
  formData: { [key: string]: any };
}

const SubmitRegistration: React.FC<SubmitRegistrationProps> = ({ variant, formData }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const endpoint = variant === "volunteer"
        ? "http://localhost:8080/api/v1/registration/volunteer"
        : "http://localhost:8080/api/v1/registration/organization";
        
      const response = await axios.post(endpoint, formData);
      
      // Handle success
      console.log("Registration successful:", response.data);
      
    } catch (error) {
      // Handle error
      console.error("Registration failed:", error);
    }
  };

  return (
    <button onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default SubmitRegistration;
