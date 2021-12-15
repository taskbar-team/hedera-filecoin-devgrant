import styled from "styled-components";
import {Card} from '../../main.style';

const TaskManagerWrapper = styled(Card)`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    padding: 15px 25px;
    align-items: center;
    border-bottom: 2px solid #eaeaea;
`;

export default TaskManagerWrapper;