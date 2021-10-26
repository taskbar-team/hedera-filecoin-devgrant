import React, { useEffect, useState } from 'react';
import { useWallet } from 'hex-wallet-provider'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 60%;
    height: 70%;
    border: 0.2rem solid gainsboro;
    border-radius: 1rem;
    margin: 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

type State = {
    id?: string,
    network?: string
}

const Home: React.FC = () => {
    const [state, setState] = useState<State | null>(null);
    const [_wallet]: any = useWallet();

    useEffect(() => {
        if (_wallet) {
            const {
                activeAddress: id,
                chainId: network
            } = _wallet;

            setState(prevState => ({
                ...prevState,
                id,
                network
            }))

            _wallet.subscribe('onAccount', (account: any) => {
                console.log("Connection event: ", account)
            })
        }

    }, [_wallet])

    return <Container>
        <Content>
            <span>Wallet address: {state?.id}</span>
            <span>Network: {state?.network}</span>
        </Content>
    </Container>
}

export default Home;