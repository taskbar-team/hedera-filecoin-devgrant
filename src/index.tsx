import HexWalletProvider from './context/HexWalletProvider';
import HexWalletContext from './context/HexWalletContext';
import useWallet from './hooks/useWallet';
import useEvent from './hooks/useEvent';
import HexLogger from './utils/HexLogger';

export default HexWalletProvider
export {
  HexWalletContext,
  useWallet,
  useEvent,
  HexLogger
}