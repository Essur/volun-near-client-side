import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

export const Card = styled.div`
  width: 350px;
  padding: 10px 10px;
  background: var(--components-background);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  font-size: 20px;
  margin: 0 0 8px;
`;

export const Category = styled.p`
  color: var(--more-details-button);
  font-weight: bold;
  margin: 0 0 10px;
`;

export const Location = styled.p`
  font-size: 14px;
  color: var(--dim-text-color);
  margin-bottom: 8px;
`;

export const TimeCommitment = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: var(--text-color);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin: 10px 10px;
`;

export const Date = styled.p`
  font-size: 14px;
`;

export const MoreDetails = styled.a`
  display: block;
  text-align: center;
  padding: 10px;
  background: var(--more-details-button);
  color: var(--more-details-text-color);
  text-decoration: none;
  border-radius: 8px;
  margin: 12px auto 16px;
  width: 90%;
  font-weight: bold;
  transition: background 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: var(--more-details-text-color-hover);
    background: var(--more-details-button-hover);
  }
`;

export const EditButton = styled(MoreDetails)`
  background-color: var(--button-bg-light);
  color: var(--button-text-light);
  border: 1px solid var(--button-border);
   
  &:hover {
    background-color: var(--button-bg-dark);
    color: var(--button-text-dark);
  }
`;

export const RemoveButton = styled(MoreDetails)`
  background-color:  #ff0000;
  &:hover {
    background-color: #b60000;
  }
`;
