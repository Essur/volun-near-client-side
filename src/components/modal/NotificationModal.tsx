import React from "react";
import { SimpleButton, StyledText, ThirdTitle } from "../../styles/GlobalStyledComponents";
import { ModalContent, ModalOverlay } from "../../styles/GlobalStyledContainers";

interface NotificationModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, title = "Confirm Action", message, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ThirdTitle>{title}</ThirdTitle>
                <StyledText>{message}</StyledText>
                <>
                    <SimpleButton onClick={onConfirm}>OK</SimpleButton>
                </>
            </ModalContent>
        </ModalOverlay>
    );
};

export default NotificationModal;