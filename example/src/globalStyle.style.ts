import { createGlobalStyle } from 'styled-components';
import styled, {keyframes} from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid gainsboro;
  border-radius: 4px;
`;

export const PrimaryButton = styled.button`
    min-width: 5rem;
    border-radius: 4px;
    background-color: #071522;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 1rem;

    &:hover {
        background-color: #0f2d48;
    }
`;

const loadingSpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #071522;
        border-radius: 50%;
        animation: ${loadingSpinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #071522 transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
        animation-delay: -0.3s;
        }
        &:nth-child(3) {
        animation-delay: -0.15s;
        }
    }   
`;