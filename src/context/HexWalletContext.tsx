import { createContext } from "react";
import { WalletContextInterface } from "../interfaces";

export default createContext<WalletContextInterface | null>(null);;