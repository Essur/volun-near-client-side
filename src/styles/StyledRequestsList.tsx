import styled from "styled-components";

export const RequestsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const VolunteerCard = styled.div`
    background: #f9f9f9;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledVolunteerInfo = styled.div`
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
`;

export const ActivityList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const ActivityItem = styled.li`
    background: #fff;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

export const ActivityTitle = styled.span`
    font-weight: bold;
    color: #007bff;
`;

export const EmailText = styled.div`
    font-size: 14px;
    color: #666;
`;

export const AcceptButton = styled.button`
    margin: 0 5px;
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s ease-in-out;

    &:hover {
        background-color: #218838;
    }

    &:disabled {
        background-color: #a5d6a7;
        cursor: not-allowed;
    }
`;

export const DetailsButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    margin-left: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ButtonsContainer = styled.div`
    margin: 10px 0px;
`;

export const RequestCancelButton = styled.button`
    padding: 8px 12px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
    border: none;
    background-color:  #ff0000;

    &:hover {
        background-color: #b60000;
    }
`;