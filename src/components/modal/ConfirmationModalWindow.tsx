import React from "react";
import { CancelButton, SimpleButton, StyledText, ThirdTitle } from "../../styles/StyledComponents";
import { ModalContent, ModalOverlay } from "../../styles/StyledContainers";

interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title = "Confirm Action", message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ThirdTitle>{title}</ThirdTitle>
                <StyledText>{message}</StyledText>
                <>
                    <SimpleButton onClick={onConfirm}>Yes</SimpleButton>
                    <CancelButton onClick={onCancel}>Cancel</CancelButton>
                </>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ConfirmationModal;