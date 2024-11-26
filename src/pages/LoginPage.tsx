import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit">Login</button>
            {error && <div style={style.error}>{error}</div>}
        </form>
    );
};

const style = {
    container: {
        width: "300px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        marginBottom: "10px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        marginTop: "10px",
        color: "red",
        fontWeight: "bold",
    },
};

export default LoginPage;
