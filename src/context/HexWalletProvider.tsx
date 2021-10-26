import * as React from 'react'
import { WalletContextInterface } from '../interfaces';
import HexWalletContext from './HexWalletContext';

declare global {
    interface Window { hex: any; }
}

type Props = {
    children: React.ReactNode,
    onConnected?: (wallet: any) => void,
    logger?: any
}

const getHex = async () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            try {
                const { hex } = window;

                if (hex) {
                    hex.enable();

                    setTimeout(() => {
                        resolve(hex)
                    }, 100)
                }

            } catch (error) {
                reject(error)
            }
        })
    })
}

const HexWalletProvider: React.FC<Props> = ({ children, logger, onConnected }) => {
    const [context, setContext] = React.useState<WalletContextInterface | null>(null);

    React.useEffect(() => {
        if (logger)
            logger.setModule('HEX-PROVIDER')

        logger.log('Fetching hex wallet');

        getHex()
            .then((hex: any) => {
                typeof (onConnected) === 'function' && onConnected(hex)

                const _ctx: WalletContextInterface = { hex }
                setContext(_ctx);

                logger.log("Hex wallet is initialized!");
            })
            .catch((e: Error) => {
                logger.logError(e)
            })

    }, [])

    return context ? <HexWalletContext.Provider value={context}>
        {children}
    </HexWalletContext.Provider> : <Loader />
}

const Loader: React.FC = () => {
    return <div>Loading...</div>
}

export default HexWalletProvider;