import { LOGIN } from "../config/ApiRoutes";

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await fetch(LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Wrong login or password");
        }

        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("An error occurred. Please try again later.");
    }
};