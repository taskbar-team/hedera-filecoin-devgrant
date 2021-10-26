import React from 'react'
import HexWalletProvider, { HexLogger } from 'hex-wallet-provider'
import Header from './components/Header'
import Home from './components/Home'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const logger = new HexLogger();
logger.enableDebugging(true);

const App = () => {

  return <HexWalletProvider logger={logger}>
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <Home />
    </React.Fragment>
  </HexWalletProvider>
}

export default App
