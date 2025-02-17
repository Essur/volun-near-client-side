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

export const StarRatingContainer = styled.div`
    font-size: 20px;
    color: #FFD700;
    text-align: left;
`;


export const FeedbackFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    max-width: 95%;
    margin: 0 20px;
`;

export const FeedbackInput = styled.textarea`
    width: 98%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    font-size: 16px;
    min-height: 150px;
`;

export const RatingContainer = styled.div`
    display: flex;
    gap: 5px;
    font-size: 24px;
    color: #FFD700;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Actions = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    cursor: pointer;
`;

export const FeedbackDescription = styled.p`
  font-size: 16px;
  color: var(--text-color);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-align: left;
`;