import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'hex-wallet-provider'
import { AccountInfo } from '../types';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    background-color: #071522;
    color: white;
`;

const Title = styled.span`
    font-size: 1.4rem;
`;

const Address = styled.span`
    font-size: 1rem;
`;

type State = {
    accountInfo: AccountInfo
}

const Header: React.FC = () => {
    const [state, setState] = useState<State>()
    const [_wallet]: any = useWallet();

    useEffect(() => {
        if (_wallet) {

            const accountInfo: AccountInfo = {
                id: _wallet.activeAddress,
                network: _wallet.chainId
            }

            setState(prevState => ({
                ...prevState,
                accountInfo
            }))
        }
    }, [_wallet])

    return <Container>
        <Title>HEX Wallet Provider</Title>
        {
            state?.accountInfo?.id ?
                <Address>
                    <span>Network: {state?.accountInfo.network}  |  ID: {state?.accountInfo.id}</span>
                </Address>
                : "Not connected"
        }
    </Container>
}

export default Header;