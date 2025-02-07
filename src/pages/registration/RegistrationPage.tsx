import { useState } from "react";
import { SimpleButton, SubTitle } from "../../styles/GlobalStyledComponents";
import RegistrationForm, { Variant } from "../forms/RegistrationForm";

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