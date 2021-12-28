import React, {useEffect, useState} from 'react';
import ContractBuilder from './views/ContractBuilder/ContractBuilder';
import TaskManager from './views/TaskManager/TaskManager';
import {AppWrapper} from './main.style';
import {ApiSession} from "../hedera-api";
import Header from "./components/Header/Header";
import Notification, {Notify} from "./components/reusable/Notification/Notification";

type Config = {
  hapiSession: ApiSession
  contract: any
}

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>({} as Config);
  const [notify, setNotify] = useState<Notify>({
    show: false,
    message: '',
    type: 'info'
  });

  const handleSetConfig = (config: Config) => {
    setConfig(config);
  };

  useEffect(() => {
    if(config && config.contract) {
      //register TaskInitialized event
      config.contract.on('TaskInitialized', ({taskId}: any) => {
        const _taskId = taskId.toString();

        setNotify({
          show: true,
          message: <span>The task has been initialized. You can find it using the following id: <b>{_taskId}</b></span>,
          type: 'success'
        });
      })
    }
  }, [config])

  return (
    <AppWrapper>
      <Notification notify={notify} setNotify={setNotify}/>
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
