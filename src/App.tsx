import React, { useState, useEffect } from 'react';
import { OperatorConfig } from './types';
import OperatorConfigForm from './views/OperatorConfig/OperatorConfigForm';
import TaskManager from './views/TaskManager/TaskManager';
import { AppWrapper } from './main.style';
import Logo from './assets/taskbar-logo.svg';
import {
  Client,
  AccountId,
  PrivateKey
} from '@hashgraph/sdk';

console.log(ContractRegistry);

type State = {
  client: Client | null,
  accountId: string,
}

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    client: null,
    accountId: '',
  });

  useEffect(() => {
    const operator = localStorage.getItem('operator');

    if (operator) {
      const operatorConfig: OperatorConfig = JSON.parse(operator);
      handleSetClient(operatorConfig);
    }
  }, [])

  const handleSetClient = (operator: OperatorConfig) => {
    const client = Client.forTestnet();

    try {
      const OPERATOR_ID = AccountId.fromString(operator.accountId);
      const OPERATOR_KEY = PrivateKey.fromString(operator.privateKey);

      client.setOperator(OPERATOR_ID, OPERATOR_KEY);

      setState({
        ...state,
        client,
        accountId: client.operatorAccountId?.toString() ?? ''
      });

      localStorage.setItem('operator', JSON.stringify(operator));

    } catch (error) {
      throw new Error("Cannot initialize the client with the provided config");

    }
  }

  return (
    <AppWrapper>
      {!!state.client
        ? <React.Fragment>
          <div className="header">
            <div className="logo">
              <img src={Logo} alt="Hashgraph Logo" />
            </div>
            <div className="account">
              <span>Wallet ID:</span>
              <a target="_blank" href={`https://app.dragonglass.me/hedera/accounts/${state.accountId}`}>{state.accountId}</a>
            </div>
          </div>
          <TaskManager />
        </React.Fragment>
        : <OperatorConfigForm onSubmit={handleSetClient} />
      }

    </AppWrapper>
  );
}

export default App;
