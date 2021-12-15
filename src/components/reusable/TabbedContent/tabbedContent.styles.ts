import styled from "styled-components";

const TabbedContentWrapper = styled.div`
    width: 100%;
`;

export const TabsWrapper = styled.div`
    border-bottom: 1px solid grainsboro;
    background-color: white;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 0 rgb(0 0 0 / 10%);
    border-radius: 0 0 4px 4px;
`;

export const TabWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 5px solid transparent;
    bottom: -1.5px;
    cursor: pointer;
    padding: 1rem;
    position: relative;

    &:hover {
        background: #6dc7be;
        color: white;
    }

    &.active {
        border-bottom: 5px solid #6dc7be;
        cursor: auto;
        text-decoration: none;
    }

    &.empty {
        color: gray;
        cursor: default;
        
        &:hover {
            text-decoration: none;
        }
    }
`;

export const TabContentWrapper = styled.div`
    padding: 2rem;
`;


export default TabbedContentWrapper;