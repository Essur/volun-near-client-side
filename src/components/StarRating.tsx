import styled from "styled-components";

const Star = styled.span<{ $filled: boolean }>`
    font-size: 24px;
    cursor: pointer;
    color: ${({ $filled }) => ($filled ? "#FFD700" : "#ddd")};
    transition: color 0.2s;
`;

interface StarProps {
    filled: boolean;
    onClick: () => void;
}

const StarRating: React.FC<StarProps> = ({ filled, onClick }) => (
    <Star $filled={filled} onClick={onClick} aria-label={filled ? "Selected Star" : "Unselected Star"}>
        {filled ? "★" : "☆"}
    </Star>
);

export default StarRating;
