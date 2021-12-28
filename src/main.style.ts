import styled, { createGlobalStyle } from 'styled-components'

// DEFAULTS
export const Card = styled.div`
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px rgb(0 0 0 / 10%);
  border-radius: 5px;
  opacity: 1;
  padding-bottom: 50px;
  margin: 20px auto;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 25px;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
`;

export const Icon = styled.div<{src?: string}>`
  min-width: 16px;
  min-height: 16px;
  background: url(${(props) => props.src}) no-repeat center;
  margin-right: 0.5rem;
`;

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
  }

  body {
  margin: 0;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f9f9f9;
  }

  #root {
    display: flex;
    justify-content: center;
  }

  h1 {
    line-height: 1.2;
    font-size: 1.2rem;
    color: #2c2c2c;
    font-weight: 500;
    letter-spacing: .48px;
    text-transform: uppercase;
    margin: 0;
  }

  input, select {
    width: 100%;
    height: 42px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    background: #fff 0 0 no-repeat padding-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    color: #2c2c2c;

    &:not([type=radio]):focus {
      outline: 3px solid #6dc7be;
    }
  }

  textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    margin-top: 15px;
    background: #fff 0 0 no-repeat padding-box;
    resize: none;
    outline: none;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-family: Roboto, sans-serif;

    &:focus {
      outline: 3px solid #6dc7be;
    }
  }

  button {
    background: #6dc7be;
    border-radius: 3px;
    min-width: 120px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .28px;
    color: #fff;
    border: none;
    margin: 0 auto;
    outline: none;

    &:hover {
      cursor: pointer;
    }
  }

  .inline {
    display: flex;
  }
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80rem;
  width: 100%;
`;

export default GlobalStyle;
