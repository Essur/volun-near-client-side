import { GET_ORGANIZATION_ID, LOGIN } from "../config/ApiRoutes";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
}


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

export const getOrganizationId = async () => {
    try {
        const response = await fetch (GET_ORGANIZATION_ID, {
            method: "GET",
            headers: HEADERS
        })

        if (response.ok) {
            const orgId = await response.json();
            localStorage.setItem("orgId", orgId.toString());
        } else {
            throw new Error("Failed to fetch your id, try re-login");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}