import React from "react";
import HeaderWrapper from "./header.style";
import {ApiSession} from "../../../hedera-api";
import {LiveContract} from "../../../hedera-api/src/lib/live/LiveContract";
import Logo from "../../assets/taskbar-logo.svg";
import utils from "../../utilities/utils";

type Props = {
  config: {
    hapiSession: ApiSession,
    contract: LiveContract
  },
}

const Header: React.FC<Props> = ({config}) => {
  const accountId = config.hapiSession?.accountId.toString() || "";
  const contractId = config.contract?.id.toString() || "";

  const handleForgetLastDeployed = () => {
    utils.removeLastDeployed();
    window.location.reload();
  };

  return <HeaderWrapper>
    <div className="logo">
      <img src={Logo} alt="Taskbar Logo"/>
    </div>
    <div>
      <div className="account">
        <span>Wallet ID:</span>
        <a target="_blank" href={`https://testnet.dragonglass.me/hedera/accounts/${accountId}`}>{accountId}</a>
      </div>
      <div className="contract">
        <span>Contract ID:</span>
        <a target="_blank" href={`https://testnet.dragonglass.me/hedera/contracts/${contractId}`}>{contractId}</a>
        <span className="remove-contract" onClick={handleForgetLastDeployed}>↻</span>
      </div>
    </div>
  </HeaderWrapper>
}

export default Header;
