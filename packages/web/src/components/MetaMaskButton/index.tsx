import { FC, useCallback } from 'react';

function getMetaMask() {
  if (typeof window === 'undefined' || !('ethereum' in window)) {
    return undefined;
  }

  return (window as typeof window & { ethereum: any }).ethereum;
}

const MetaMaskButton: FC = () => {
  const onConnectMetaMask = useCallback(async () => {
    const web3 = getMetaMask();
    const accounts = await web3?.request({ method: 'eth_requestAccounts' });

    // eslint-disable-next-line no-console
    console.log(accounts);
  }, []);

  const hasMetaMask = getMetaMask()?.isMetaMask;

  return (
    <button onClick={onConnectMetaMask} type="button" disabled={!hasMetaMask}>
      Conectar MetaMask
    </button>
  );
};

export default MetaMaskButton;
