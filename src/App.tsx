import React, {useState} from 'react';
import ContractBuilder from './views/ContractBuilder/ContractBuilder';
import TaskManager from './views/TaskManager/TaskManager';
import {AppWrapper} from './main.style';
import {ApiSession} from "../hedera-api";
import {LiveContract} from "../hedera-api/src/lib/live/LiveContract";
import Header from "./components/Header/Header";

type Config = {
  hapiSession: ApiSession
  contract: LiveContract
}

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>({} as Config);

  const handleSetConfig = (config: Config) => {
    setConfig(config);
  };

  return (
    <AppWrapper>
      {!!config.contract
        ? <React.Fragment>
          <Header config={config}/>
          <TaskManager hapiSession={config.hapiSession} contract={config.contract}/>
        </React.Fragment>
        : <ContractBuilder onSubmit={handleSetConfig}/>
      }

    </AppWrapper>
  );
}

export default App;
