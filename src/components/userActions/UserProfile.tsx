import React, { useState, useEffect, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setUsername(null); 
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <div style={styles.userProfile}>
            {username ? (
                <div>
                    <span
                        style={styles.username}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {username} ▼
                    </span>
                    {menuOpen && (
                        <div style={styles.dropdownMenu}>
                            <button style={styles.menuItem} onClick={() => navigate("/profile")}>
                                View Profile
                            </button>
                            <button style={styles.menuItem} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Link to="/login" style={styles.link}>
                        Sign In
                    </Link>
                    <Link to="/register" style={styles.link}>
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

const styles : { [key: string]: CSSProperties } = {
    userProfile: {
        position: "relative",
        color: "white",
    },
    username: {
        cursor: "pointer"
    },
    dropdownMenu: {
        position: "absolute" as "absolute",
        top: "100%",
        right: 0,
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    menuItem: {
        display: "block",
        background: "transparent",
        color: "white",
        border: "none",
        padding: "5px 0",
        textAlign: "left" as "left",
        cursor: "pointer",
        width: "100%",
    },
    link: {
        margin: "0 10px",
        color: "white",
        textDecoration: "none",
    },
};

export default UserProfile;
