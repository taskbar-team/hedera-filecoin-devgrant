import React from 'react'
import HexWalletProvider, { HexLogger } from 'hex-wallet-provider'
import Header from './components/Header'
import Home from './components/Home'
import GlobalStyle from './globalStyle.style'

const logger = new HexLogger();
logger.enableDebugging(true);

const App: React.FC = () => {
  return <HexWalletProvider logger={logger}>
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <Home />
    </React.Fragment>
  </HexWalletProvider>
}

export default App
