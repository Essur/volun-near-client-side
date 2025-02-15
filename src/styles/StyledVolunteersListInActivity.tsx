import styled from "styled-components";

export const VolunteersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`;

export const VolunteerCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

export const VolunteerName = styled.h3`
    margin: 5px 0;
    font-size: 18px;
`;

export const VolunteerEmail = styled.p`
    margin: 5px 0;
    font-size: 14px;
    color: var(--text-color);
`;

export const KickButton = styled.button`
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    cursor: pointer;
    margin: 5px 0;
    &:hover {
        background-color: darkred;
    }
`;

export const DateOfEntrance = styled.p`
    margin: 5px 0;
    font-size: 12px;
    color: var(--text-color);
`;