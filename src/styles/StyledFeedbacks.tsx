import styled from "styled-components";

export const FeedbackContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
`;

export const FeedbackCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

export const FeedbackHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const UserName = styled.h3`
    margin: 0;
    font-size: 18px;
`;

export const Rating = styled.div`
    color: gold;
    font-size: 20px;
`;

export const Description = styled.p`
    margin: 0;
    font-size: 14px;
    color: gray;
`;

export const Star = styled.span`
    margin-right: 3px;
    color: gold;
`;

export const AverageRating = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const StarRating = styled.div`
    font-size: 20px;
    color: #FFD700;
`;
