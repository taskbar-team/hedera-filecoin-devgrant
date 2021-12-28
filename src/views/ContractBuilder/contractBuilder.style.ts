import styled from 'styled-components';
import { Card } from '../../main.style';

const ContractBuilderWrapper = styled(Card)`
    padding: 2rem;
    width: 40%;
`;

export const ContractBuilderStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const StatusLabel = styled.span`
  color: rgb(109,199,190);
  font-weight: bold;
`;

export const LoadingSpinnerWrapper = styled.div`
  padding-top: 2rem;
  div {
    width: 2rem;
    height: 2rem;
  }
`;

export default ContractBuilderWrapper;
