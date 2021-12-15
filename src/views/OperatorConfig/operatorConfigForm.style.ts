import styled from 'styled-components';
import { Card } from '../../main.style';

const OperatorConfigWrapper = styled(Card)`
    padding: 2rem;
`;

export const InputForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;

    input {
        min-width: 20rem;
        margin: 0.2rem 0;
    }
`;

export const ActionsForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;

    button {
        margin: 0.2rem 0;
    }
`;

export default OperatorConfigWrapper;