import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ConnectionInfo = styled.div`
    width: 60%;
    height: 70%;
    border: 0.2rem solid gainsboro;
    border-radius: 1rem;
    margin: 2rem 2rem 0rem 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const ActionSectionWithInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid gainsboro;
    border-radius: 1rem;
    padding: 1rem 4rem;
    color: gray;

    input {
        min-width: 15rem;
        margin: 0.5rem 0;
    }
`;

export const ActionsContainer = styled.div`
    width: 60%;
    border: 0.2rem solid gainsboro;
    border-radius: 1rem;
    margin: 2rem 2rem 0 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Action = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
`;

export const JSONInfoContainer = styled.div`
    width: 100%;
    border: 0.2rem solid gainsboro;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #545454;

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;

        & > span {
            padding-left: .5rem;
        }

        .close-button {
            border: none;
            background-color: transparent;

            &:hover {
                color: gray;
                cursor: pointer;
            }
        }
    }
`;

export const Web3StorageContainer = styled.div`
    width: 60%;
    border: 0.2rem solid gainsboro;
    border-radius: 1rem;
    margin: 2rem 2rem 0 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;