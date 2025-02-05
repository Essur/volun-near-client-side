import styled from "styled-components";

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0px;
`;

export const MainContentContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: var(--main-content-container);
`;

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--navbar-bg);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
`;

export const MdContainer = styled.div`
  max-width: 100%;
  margin: 0px auto;
  padding: 10px;
  background: var(--main-content-container);
  color: var(--text-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const LinksContainer = styled.div`
    display: flex;
    gap: 15px;
`;

export const OrganizationDetails = styled.div`
    margin-top: 5px;
    font-size: 0.9rem;
    color: var(--text-color);
`;

export const EditModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    position: relative;
`;

export const ConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ConfirmContent = styled.div`
    background: var(--navbar-bg);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const StyledFooter = styled.footer`
    width: 100%;
    padding: 10px;
    text-align: center;
    background: var(--navbar-bg);
    color: var(--text-color);
    border-top: 1px solid var(--button-border);
`;
