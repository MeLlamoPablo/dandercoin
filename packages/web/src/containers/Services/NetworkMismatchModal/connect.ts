import useWalletActions from '$/api/hooks/wallet/useWalletActions';
import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';

export default function useConnect() {
  const { setupMetamaskNetwork } = useWalletActions();
  const isCorrectNetwork = useIsCorrectNetwork() !== 'incorrect';

  return {
    handle: {
      setupMetamaskNetwork,
    },
    isCorrectNetwork,
  };
}
