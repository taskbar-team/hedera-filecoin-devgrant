import { useState, useContext, useEffect } from "react";
import { WalletContextInterface } from "../interfaces";
import HexWalletContext from "../context/HexWalletContext";

const useWallet = () => {
    const [wallet, setWallet] = useState<WalletContextInterface | null>(null);
    const _context = useContext(HexWalletContext);

    useEffect(() => {
        _context && setWallet(_context.hex)
    })

    return [wallet]
}

export default useWallet;