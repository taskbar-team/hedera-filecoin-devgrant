import React, { useEffect, useState } from 'react';
import { useWallet } from 'hex-wallet-provider'
import { AccountInfo } from '../../types';
import {
    Container,
    Title,
    Address
} from './header.style';

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