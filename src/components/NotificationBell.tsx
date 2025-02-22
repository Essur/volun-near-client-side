import { FaBell } from "react-icons/fa";
import styled from "styled-components";

interface NotificationBellProps {
    isSubscribed: boolean;
    onToggle: () => void;
}

const BellButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ $active }) => ($active ? "gold" : "grey")};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffd700" : "#b0b0b0")};
  }
`;

const NotificationBell: React.FC<NotificationBellProps> = ({ isSubscribed, onToggle }) => {
    return (
        <BellButton $active={isSubscribed} onClick={onToggle}>
            <FaBell />
        </BellButton>
    );
};

export default NotificationBell;

