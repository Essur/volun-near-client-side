import React, { CSSProperties, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Navbar: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const role = localStorage.getItem("role");
    let sRole = role?.substring(6, role.length - 1).toLowerCase();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(".dropdown-container")) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [menuOpen]);


    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>VolunNear App</h1>
            <div style={styles.links}>
                {isLoggedIn ? (
                    <div className="dropdown-container" style={styles.dropdownContainer}>
                        <span
                            style={styles.username}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {username} ▼
                        </span>
                        {menuOpen && (
                            <div style={styles.dropdownMenu}>
                                <button style={styles.menuItem} onClick={() => 
                                    sRole == "volunteer" ? navigate("/volunteer-profile") : navigate("/organization-profile")}>
                                    View Profile
                                </button>
                                <button style={styles.menuItem} onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Sign In</Link>
                        <Link to="/register" style={styles.link}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles : { [key: string]: CSSProperties } = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
    },
    title: {
        margin: 0,
    },
    links: {
        display: "flex",
        gap: "15px",
    },
    link: {
        color: "white",
        textDecoration: "none",
    },
    username: {
        cursor: "pointer",
    },
    dropdownContainer: {
        position: "relative",
    },
    dropdownMenu: {
        position: "absolute",
        top: "100%",
        right: 0,
        color: "black",
        padding: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        zIndex: 100,
    },
    menuItem: {
        display: "block",
        padding: "5px 10px",
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
    },
};

export default Navbar;
