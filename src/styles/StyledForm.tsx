import styled from "styled-components";

export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 95%;
    min-height: 450px;
    min-width: 95%;
    color: var(--text-color);
    background-color: var(--main-content-container);
`;

export const ActivityFormCreationContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--components-background);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const DropdownHints = styled.ul`
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid var(--button-border);
    border-radius: 4px;
    margin-top: 5px;
    padding: 0;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
`;

export const DropdownHintItem = styled.li`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;