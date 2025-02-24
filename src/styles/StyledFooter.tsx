import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledFooter = styled.footer`
  width: 100%;
  padding: 20px;
  background: var(--navbar-bg, #3f4bf7);
  color: var(--text-color, white);
  border-top: 1px solid var(--button-border, rgba(255, 255, 255, 0.2));
  text-align: center;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 10px;
`;

export const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;
  text-align: left;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const FooterLink = styled(Link)`
  display: block;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 5px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #f39c12;
    text-decoration: underline;
  }

  &:active {
    color: #e67e22;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  a {
    color: var(--text-color);
    font-size: 18px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #f39c12;
    }
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.8;
`;
