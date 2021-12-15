import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinnerWrapper = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6dc7be;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${spin} 1s linear infinite;
`;

export default LoadingSpinnerWrapper;