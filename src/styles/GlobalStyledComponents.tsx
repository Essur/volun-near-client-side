import styled from "styled-components";
import { Link } from "react-router-dom";


export const FeaturesList = styled.ul`
  padding-left: 20px;
`;

export const FeatureItem = styled.li`
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: var(--main-content-container);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  color: var(--text-color);
  background: var(--dropdown-bg);
  border: 1px solid var(--button-border);
  border-radius: 6px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--button-hover);
    box-shadow: 0 0 5px var(--button-hover);
  }
`;

export const StyledText = styled.p`
    color: var(--text-color);
    margin: 5px;
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin: 0 0 10px;
`;

export const Strong = styled.strong`
    color: var(--text-color);
`;

export const Title = styled.h1`
    margin: 0;
    margin-bottom: 10px;
    color: var(--text-color);
`;

export const SubTitle = styled.h2`
    margin: 10px;
    color: var(--text-color);
`;

export const ThirdTitle = styled.h3`
    margin: 10px;
    color: var(--text-color);
`;

export const StyledLink = styled(Link)`
    color: var(--text-color);
    text-decoration: none;
    border-radius: 8px;
    padding: 8px;
    transition: background-color 0.5s ease, color 0.5s ease;
    &:hover {
        border: 1px solid var(--button-border);
        color: var(--button-text-light);
        background-color: var(--button-bg-light);
    }
`;

export const SignInLink = styled(StyledLink)`
    border: 1px solid var(--button-border);
    background-color: var(--button-bg-light);
    color: var(--button-text-light);
`;

export const SignUpLink = styled(StyledLink)`
    border: 1px solid var(--button-border-dark);
    background-color: var(--button-bg-dark);
    color: var(--button-text-dark);
`;

export const Username = styled.span`
    cursor: pointer;
    color: var(--text-color);
`;

export const DropdownContainer = styled.div`
    position: relative;
    color: var(--text-color);
    text-decoration: none;
    border-radius: 8px;
    padding: 8px;
    transition: background-color 0.5s ease,color 0.5s ease;
    &: hover {
        background: var(--menu-hover);
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    background: var(--dropdown-bg);
    color: var(--text-color);
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    z-index: 100;
    width: max-content;
    right: 5px;
    left: -15px;
`;

export const MenuItem = styled.button`
    color: var(--text-color);
    display: block;
    padding: 5px 10px;
    text-align: left;
    cursor: pointer;
    width: 100%;
    background: none;
    border: none;
    font: inherit;
    &:hover {
        background: var(--menu-hover);
    }
`;

export const ThemeButton = styled.button`
    background: var(--theme-button-bg);
    border: 1px solid var(--button-border);
    color: var(--text-color);
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background: var(--button-hover);
    }
`;

export const SimpleButton = styled.button`
    background: var(--theme-button-bg);
    border: 1px solid var(--button-border);
    color: var(--text-color);
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 8px;
    margin: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        background: var(--button-hover);
    }
`;

export const CancelButton = styled.button`
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: 1px solid var(--button-border);
    border-radius: 5px;
    cursor: pointer;
`;

export const Loading = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
`;

export const Error = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: red;
`;

export const OrganizationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const OrganizationItem = styled.li`
    background-color: var(--organization-list-item-bg);
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease, color 0.2s ease;
    cursor: pointer;
    &:hover {
        background-color: var(--organization-list-item-bg-hover);
    }
`;

export const OrganizationName = styled.strong`
  font-size: 1.2rem;
`;

export const Details = styled.div`
  padding: 10px 0;
  font-size: 18px;
  color: var(--text-color);
  text-align: left;
`;

export const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const StyledListItem = styled.li`
  background: var(--navbar-bg);
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  h3 {
    margin-bottom: 5px;
    color: var(--text-color);
  }

  p {
    margin: 5px 0;
    color: var(--text-color);
  }
`;

export const Tag = styled.span`
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 5px;
`;

export const PreferenceList = styled.ul`
    list-style: none;
    padding: 0;
    width: fit-content;
    background: none;
    margin: 5px;
`;

export const PreferenceListItem = styled.li`
    color: var(--text-color);
    padding: 0px;
    h3 {
        margin-bottom: 5px;
        color: var(--text-color);
    }

    p {
        margin: 5px 0;
        color: var(--text-color);
    }
`;
