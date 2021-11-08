import React, { useEffect, useState } from 'react';
import { useWallet } from 'hex-wallet-provider'
import {
    Container,
    ConnectionInfo,
    ActionsContainer,
    JSONInfoContainer,
    Action,
    Web3StorageContainer,
    ActionSectionWithInput
} from './home.style';
import {
    AccountId,
    PrivateKey,
    Client,
} from '@hashgraph/sdk';
import TransactionService from '../../services/transactions.service';
import Web3StorageSample from '../Web3Storage'
import { Input, PrimaryButton } from '../../globalStyle.style';

type State = {
    id?: string,
    network?: string,
    client?: Client,
    transferTransactionInfo?: Object,
    contractInfo?: Object
}

const Home: React.FC = () => {
    const [state, setState] = useState<State | null>(null);
    const [message, setMessage] = useState('');
    const [_wallet]: any = useWallet();

    useEffect(() => {
        if (_wallet) {
            const {
                activeAddress: id,
                chainId: network
            } = _wallet;

            const client: Client = initClient();

            setState(prevState => ({
                ...prevState,
                id,
                network,
                client
            }))

        }

    }, [_wallet])

    const initClient = () => {
        const client = Client.forTestnet();
        const _accountId = process.env.REACT_APP_ACCOUNT_ID || '';
        const _privateKey = process.env.REACT_APP_PRIVATE_KEY || '';

        try {
            const OPERATOR_ID = AccountId.fromString(_accountId);
            const OPERATOR_KEY = PrivateKey.fromString(_privateKey);

            client.setOperator(OPERATOR_ID, OPERATOR_KEY);
        } catch (error) {
            throw new Error("Cannot initialize the client. Please check your .env file");

        }

        return client
    }

    const handleTransferTransaction = async () => {
        const client = state?.client;

        if (!client) {
            console.log('Client not found. A transaction needs to be signed by an operator')
            return;
        }

        const transaction = await TransactionService.newTransferTransaction(client);

        setState(prevState => ({
            ...prevState,
            transferTransactionInfo: transaction
        }))

    }

    const handleGetContractInfo = async (_contractId: string) => {
        const client = state?.client;

        if (!client) {
            console.log('Client not found. The "contractInfoQuery" function needs to be executed by a client')
            return;
        }

        const contractInfo = await TransactionService.getContractInfo(client, _contractId);

        setState(prevState => ({
            ...prevState,
            contractInfo
        }))

    }

    const handleSignMessage = () => {
        if (!_wallet) {
            return console.log('HEX could not be found');
        }

        _wallet.signMessage({ message })
        setMessage('');
    }

    return <Container>
        <ConnectionInfo>
            <span>Wallet address: {state?.id}</span>
            <span>Network: {state?.network}</span>
        </ConnectionInfo>
        <ActionsContainer>
            <h4>Transactions</h4>

            <ActionSection
                header={"Transaction info"}
                info={state?.transferTransactionInfo}
                callback={handleTransferTransaction}
            >Transfer Transaction</ActionSection>

            <ActionSection
                header={"Contract info"}
                info={state?.contractInfo}
                callback={() => handleGetContractInfo("0.0.2899622")}
            >Contract Info</ActionSection>

            <ActionSectionWithInput >
                Message
                <Input
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} />
                <ActionSection
                    header={""}
                    info={null}
                    callback={handleSignMessage}
                >Sign with Hex</ActionSection>
            </ActionSectionWithInput>

        </ActionsContainer>
        <Web3StorageContainer>
            <h4>Web3.storage</h4>
            <Web3StorageSample />
        </Web3StorageContainer>
    </Container>
}

const ActionSection = ({ header, info, callback, children }: any) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisibleState(true);
    }, [info])

    const setVisibleState = (_state: boolean) => {
        setVisible(_state)
    }

    return <Action>
        <PrimaryButton onClick={callback}>{children}</PrimaryButton>
        {
            visible && info && <JSONInfoContainer>
                <div className="header">
                    <span>{header}</span>
                    <button className="close-button" onClick={() => setVisibleState(false)}>✖</button>
                </div>
                <pre>{JSON.stringify(info, null, 4)}</pre>
            </JSONInfoContainer>
        }
    </Action>
}

export default Home;