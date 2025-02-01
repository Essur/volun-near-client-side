import { useState } from "react";
import RegistrationForm , { Variant } from "../registration/RegistrationForm";
import { SimpleButton, SubTitle } from "../../styles/StyledComponents";

export default function RegistrationPage() {
    const [variant, setVariant] = useState<Variant>("volunteer");

    return (
      <>
        <SubTitle>Choose your role:</SubTitle>
        <>
          <SimpleButton onClick={() => setVariant("volunteer")}>Volunteer</SimpleButton>
          <SimpleButton onClick={() => setVariant("organization")}>Organization</SimpleButton>
        </>
        <RegistrationForm variant={variant} />
      </>
    );
}