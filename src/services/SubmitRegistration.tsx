// SubmitRegistration.tsx
import React, { useState } from "react";
import { Variant } from "../pages/registration/RegistrationForm";
import { useNavigate } from 'react-router-dom';
import { SimpleButton } from "../styles/StyledComponents";


interface SubmitRegistrationProps {
  variant: Variant;
  formData: { [key: string]: any };
}

const SubmitRegistration: React.FC<SubmitRegistrationProps> = ({ variant, formData }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const endpoint = variant === "volunteer"
        ? "http://localhost:8080/api/v1/registration/volunteer"
        : "http://localhost:8080/api/v1/registration/organization";

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok){
        console.log("Registration successful: ", response.status);
        setMessage("Registration succesfull. Redireting...");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (response.status === 409) {
        console.log("Registration failed: ", response.status);
        setMessage("User already exists!");

      }
    } catch (error) {
      console.error("Registration failed: ", error);
      setMessage("An error occurred. Please try again.");
    }
    
  };

  return (
    <>
      <SimpleButton onClick={handleSubmit}>
        Submit
      </SimpleButton>
      {message && <p>{message}</p>}
    </>
  );
};

export default SubmitRegistration;
