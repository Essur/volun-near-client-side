import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/AuthService";
import { useAppNavigation } from "../services/utils/AppNavigation";
import { Error, FormContainer, Input, SimpleButton, SubTitle } from "../styles/GlobalStyledComponents";

interface LoginInputs {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
    const [loginError, setLoginError] = useState<string | null>();
    const { goTo } = useAppNavigation();
    const expiryTime = 3600000;
    const { login } = useAuth();

    const onSubmit: SubmitHandler<LoginInputs> = async ({ username, password }) => {
        try {
            const data = await loginUser(username, password);
            login(username, data.token, data.refreshToken, data.role, expiryTime);
            setLoginError(null);
            goTo("/");
        } catch {
            setLoginError("Wrong username or password!");
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Login</SubTitle>
            <Input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
            />
            {errors.username && <Error>{errors.username.message}</Error>}

            <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}

            <SimpleButton type="submit">Login</SimpleButton>
            {loginError && <Error>{loginError}</Error>}
        </FormContainer>
    );
};


export default LoginPage;
