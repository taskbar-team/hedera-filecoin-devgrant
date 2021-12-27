import styled from 'styled-components';
import { CardHeader } from '../../main.style';

const FindTasksWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FindTasksHeader = styled(CardHeader)`
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 0;
    width: 100%;

    section {
        display: flex;
        align-items: center;

        a {
            margin: 0 1rem;

            img {
                width: 2.3rem;
                height: 2.3rem;
            }
        }
    }
`;

export const TasksWrapper = styled.div`
    width: 100%;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const TasksListSection = styled.div`
    width: 100%;
`;

export const NoTasksFound = styled.div`
    display: flex;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #c1c1c1;
    padding-top: 4rem;
`;

export default FindTasksWrapper;
