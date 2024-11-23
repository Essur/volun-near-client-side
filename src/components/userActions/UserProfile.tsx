import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <span onClick={toggleDropdown} style={styles.username}>
                {username || "User"} ▼
            </span>
            {isDropdownVisible && (
                <div style={styles.dropdown}>
                    <button
                        style={styles.dropdownItem}
                        onClick={() => navigate("/profile")}
                    >
                        View Profile 
                    </button>
                    <button style={styles.dropdownItem} onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: "relative" as const,
        display: "inline-block",
        cursor: "pointer",
    },
    username: {
        color: "white",
        padding: "5px 10px",
        backgroundColor: "#282c34",
        borderRadius: "5px",
        fontSize: "16px",
    },
    dropdown: {
        position: "absolute" as const,
        top: "100%",
        right: 0,
        backgroundColor: "#FFF",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
        minWidth: "150px",
    },
    dropdownItem: {
        padding: "10px 15px",
        textAlign: "left" as const,
        backgroundColor: "#000",
        border: "none",
        width: "100%",
        cursor: "pointer",
    },
};

export default UserProfile;
