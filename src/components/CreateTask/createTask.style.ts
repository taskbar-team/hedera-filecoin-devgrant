import styled from "styled-components";
import { CardHeader } from '../../main.style';

const CreateTaskWrapper = styled.div`
    width: 100%;
`;

export const CreateTaskHeader = styled(CardHeader)`
    display: flex;
    justify-content: flex-start;
    padding-left: 0;
`;


export const CreateTaskSubtitle = styled.div<any>`
    letter-spacing: .34px;
    color: #2c2c2c;
    font-size: ${props => props.small ? '16px' : '19px'};
    font-weight: 500;
    margin-bottom: 15px;
`;

export const TaskSection = styled.div`
    border-bottom: 2px solid #eaeaea;
    padding: 15px 0;
`;

export const ExampleContainer = styled.div`
    margin-top: 1rem;
    padding-left: 0.6rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;

    ul {
        li {
            padding: 7px 0;
        }
    }
`;

export const TaskPaymentWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const TaskPaymentType = styled.div`
    display: flex;
    margin: 0.2rem 4rem 0.2rem 0;
    font-weight: 500;

    input {
        width: 15px;
        height: 15px;
        margin-right: 0.5rem;
        color: #6dc7be;
    }
`;

export const TaskPaymentRateInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 4rem;

    span {
        margin: 0.5rem 0;
    }

    input, select {
        min-width: 15rem;
    }
`;

export const PaymentTypeOptionsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    font-weight: 500;
`;

export const ApplyBeforeWrapper = styled.div`
  padding: 0.5rem 0;

  & > * {
    margin-right: 1rem;
  }

  & {
    span {
      color: #707070;
    }
  }
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 3rem 0;

    button {
        min-width: 16rem;
        height: 3rem;
    }
`;

export const CreateTaskButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    max-width: 1.5rem;
    max-height: 1.5rem;
  }
`;

export default CreateTaskWrapper;
