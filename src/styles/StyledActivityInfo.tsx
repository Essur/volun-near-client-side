import styled from "styled-components";

// Container for the whole page
export const ActivityContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

// Left side: Title and description
export const ActivityDetails = styled.div`
    flex: 2;
    text-align: left;
    padding: 0 10px;
    border-radius: 8px;
    background-color: var(--components-background);
    margin-right: 10px;
`;

export const ActivityTitle = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const ActivityDescription = styled.p`
    font-size: 1.1rem;
    line-height: 1.5;
    color: var(--text-color);
`;

// Right side: Additional info
export const StyledActivityInfo = styled.div`
    flex: 1;
    background: var(--components-background);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const InfoItem = styled.div`
    margin-bottom: 15px;
`;

export const InfoTitle = styled.h3`
    font-size: 1rem;
    color: var(--activity-info-text-title);
    font-weight: bold;
    margin-bottom: 5px;
`;

export const InfoText = styled.p`
    font-size: 0.95rem;
    color: var(--text-color);
`;

export const InfoLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;
