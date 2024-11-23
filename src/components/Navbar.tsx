import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './userActions/UserProfile';

const Navbar: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>VolunNear App</h1>
            <div style={styles.links}>
                <Link to="/dashboard" style={styles.link}>
                    Dashboard
                </Link>
                {!username ? (
                    <>
                        <Link to="/login" style={styles.link}>
                            Sign In
                        </Link>
                        <Link to="/register" style={styles.link}>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <span><UserProfile /></span>
                )}
            </div>
        </nav>
    );
};

const styles = {
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
};

export default Navbar;