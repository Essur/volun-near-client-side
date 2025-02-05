import React from "react";
import { EditModalContainer, ModalContent } from "../../styles/GlobalStyledContainers";
import { Input, SimpleButton, SubTitle } from "../../styles/GlobalStyledComponents";

interface AddPreferenceModalProps {
    isOpen: boolean;
    newPreference: string;
    setNewPreference: (value: string) => void;
    onAdd: () => void;
    onClose: () => void;
}

const AddPreferenceModal: React.FC<AddPreferenceModalProps> = ({ isOpen, newPreference, setNewPreference, onAdd, onClose }) => {
    if (!isOpen) return null;

    return (
        <EditModalContainer>
            <ModalContent>
                <SubTitle>Add Preference</SubTitle>
                <Input
                    type="text"
                    placeholder="Add a preference"
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                />
                <>
                    <SimpleButton onClick={onAdd}>Add</SimpleButton>
                    <SimpleButton onClick={onClose}>Close</SimpleButton>
                </>
            </ModalContent>
        </EditModalContainer>
    );
};

export default AddPreferenceModal;