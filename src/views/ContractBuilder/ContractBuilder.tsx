import React, {useState, useEffect, useCallback} from 'react';
import {HederaNetwork} from "hedera-api";
import utils from "../../utilities/utils";
import {debounce} from 'lodash';
import LoadingSpinner from "../../components/reusable/LoadingSpinner/LoadingSpinner";
import ContractBuilderHelper from "./contractBuilderHelper";
import ContractBuilderWrapper, {
  ContractBuilderStatus,
  StatusLabel,
  LoadingSpinnerWrapper
} from './contractBuilder.style';
import {CardHeader} from '../../main.style';

type Props = {
  onSubmit: (config: any) => void;
}

const DEBOUNCE_TIME_ON_SUBMIT = 1000;

const ContractBuilder: React.FC<Props> = ({onSubmit}) => {
  const [status, setStatus] = useState('Idle')

  const debouncedSubmit = useCallback(
    debounce((config) => onSubmit(config), DEBOUNCE_TIME_ON_SUBMIT), []);

  const fetchContracts = async () => {
    const hapiSession = await HederaNetwork.defaultApiSession(process.env);
    const owner = hapiSession.accountId.toSolidityAddress();
    const lastDeployed = utils.getLastDeployed();

    if (lastDeployed) {
      const taskRegistry = await ContractBuilderHelper
        .getLiveContract({
          hapiSession,
          lastDeployed,
          onStatusChange: setStatus
        })

      setStatus('Successful fetched');
      debouncedSubmit({hapiSession, contract: taskRegistry});

    } else {
      const liveContracts = await ContractBuilderHelper
        .deployContracts({
          hapiSession,
          onStatusChange: setStatus
        });

      const {taskRegistry, cappedRegistryHelper} = liveContracts;
      const cappedRegistryID = cappedRegistryHelper.id.toSolidityAddress();

      utils.setLastDeployed(liveContracts);

      setStatus("Register events")
      taskRegistry.on("OwnershipTransferred", ({ previousOwner, newOwner }: any) => {
        console.log("OwnershipTransferred", {previousOwner, newOwner})
      });

      setStatus("Initialize TaskRegistry")
      await taskRegistry.initialize({gas: 100000}, owner, cappedRegistryID);

      setStatus('Done')
      debouncedSubmit({hapiSession, contract: taskRegistry});
    }
  }

  useEffect(() => {
    fetchContracts();
  }, [])

  return <ContractBuilderWrapper>
    <CardHeader>
      <h1>Contract Builder</h1>
    </CardHeader>

    <ContractBuilderStatus>
      <div><StatusLabel>Status:</StatusLabel> {status}</div>
      <LoadingSpinnerWrapper>
        <LoadingSpinner/>
      </LoadingSpinnerWrapper>
    </ContractBuilderStatus>

  </ContractBuilderWrapper>;
};

export default ContractBuilder;
