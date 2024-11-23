import { useState } from "react";
import RegistrationForm , { Variant } from "../registration/RegistrationForm";

export default function RegistrationPage() {
    const [variant, setVariant] = useState<Variant>("volunteer");

    return (
      <div>
        <h1>Register</h1>
        <div>
          <button onClick={() => setVariant("volunteer")}>Volunteer</button>
          <button onClick={() => setVariant("organization")}>Organization</button>
        </div>
        <RegistrationForm variant={variant} />
      </div>
    );
}