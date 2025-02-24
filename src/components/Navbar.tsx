import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAppNavigation } from "../services/utils/AppNavigation";
import { getRole } from "../services/utils/RoleService";
import {
  DropdownContainer,
  DropdownMenu,
  MenuItem,
  SignInLink,
  SignUpLink,
  StyledLink,
  ThemeButton,
  Title,
  Username,
} from "../styles/GlobalStyledComponents";
import {
  LinksContainer,
  NavbarContainer,
} from "../styles/GlobalStyledContainers";

const Navbar: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const sRole = getRole();
  const { goTo } = useAppNavigation();

  const handleLogout = () => {
    logout();
    goTo("/");
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
      <Title>VolunNear</Title>
      <LinksContainer>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/organizations">Organizations</StyledLink>
        <StyledLink to="/all-activities">
          Volunteering opportuinities
        </StyledLink>
        {isLoggedIn ? (
          <DropdownContainer className="dropdown-container">
            <Username onClick={() => setMenuOpen(!menuOpen)}>
              {username} ▼
            </Username>
            {menuOpen && (
              <DropdownMenu>
                <MenuItem
                  onClick={() =>
                    sRole === "volunteer"
                      ? goTo("/volunteer-profile")
                      : goTo("/organization-profile")
                  }
                >
                  View Profile
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    sRole === "volunteer"
                      ? goTo("/volunteer-requests")
                      : goTo("/organization-requests")
                  }
                >
                  My requests
                </MenuItem>
                {sRole === "organization" && (
                  <MenuItem onClick={() => goTo("/organization/my-activities")}>
                    My activities
                  </MenuItem>
                )}
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
