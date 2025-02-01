import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Title,
    StyledLink,
    Username,
    DropdownContainer,
    DropdownMenu,
    MenuItem,
    SignInLink,
    SignUpLink,
    ThemeButton,
} from "../styles/StyledComponents";
import { useTheme } from "../contexts/ThemeContext";
import { LinksContainer, NavbarContainer } from "../styles/StyledContainers";

const Navbar: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const role = localStorage.getItem("role");
    let sRole = role?.substring(6, role.length - 1).toLowerCase();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

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
        <NavbarContainer>
            <Title>VolunNear App</Title>
            <LinksContainer>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/organizations">Organizations</StyledLink>
                <StyledLink to="/about">About</StyledLink>
                {isLoggedIn ? (
                    <DropdownContainer className="dropdown-container">
                        <Username onClick={() => setMenuOpen(!menuOpen)}>
                            {username} ▼
                        </Username>
                        {menuOpen && (
                            <DropdownMenu>
                                <MenuItem onClick={() =>
                                    sRole === "volunteer" 
                                        ? navigate("/volunteer-profile") 
                                        : navigate("/organization-profile")
                                }>
                                    View Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </DropdownMenu>
                        )}
                    </DropdownContainer>
                ) : (
                    <>
                        <SignInLink to="/login">Sign In</SignInLink>
                        <SignUpLink to="/register">Sign Up</SignUpLink>
                    </>
                )}
                <ThemeButton onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </ThemeButton>
            </LinksContainer>
        </NavbarContainer>
    );
};

export default Navbar;
