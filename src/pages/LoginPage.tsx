import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormContainer, Input, SubTitle, SimpleButton, Error } from "../styles/StyledComponents";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(username, data.token, data.role);
                setError(null);
                navigate("/");
            } else {
                setError("Wrong login or password");
                console.error("Login failed");
            }
        } catch(err){
            console.error("Error during login:", err);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <SubTitle>Login</SubTitle>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <SimpleButton type="submit"> Login </SimpleButton>
            {error && <Error>{error}</Error>}
        </FormContainer>
    );
};

export default LoginPage;
