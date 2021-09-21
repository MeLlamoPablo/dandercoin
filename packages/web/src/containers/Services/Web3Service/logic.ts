import type Torus from '@toruslabs/torus-embed';
import { useCallback, useState } from 'react';
import type Web3 from 'web3';

export function hasMetamask() {
  const provider = (window as typeof window & { ethereum: any }).ethereum;
  return !!provider?.isMetaMask;
}

function useMetamaskGetter() {
  const [cachedMetamask, setCachedMetamask] = useState<
    { metamask: any; web3: Web3 } | undefined
  >(undefined);

  return useCallback(async () => {
    if (!hasMetamask()) {
      return undefined;
    }

    if (cachedMetamask) {
      return cachedMetamask;
    }

    const { default: Web3 } = await import('web3');

    const metamask = (window as typeof window & { ethereum: any }).ethereum;
    const web3 = new Web3(metamask);

    setCachedMetamask({ metamask, web3 });

    return { metamask, web3 };
  }, [cachedMetamask, setCachedMetamask]);
}

function useTorusGetter() {
  const [cachedTorus, setCachedTorus] = useState<
    | {
        torus: Torus;
        web3: Web3;
      }
    | undefined
  >(undefined);

  return useCallback(async () => {
    if (cachedTorus) {
      return cachedTorus;
    }

    const [{ default: Torus }, { default: Web3 }] = await Promise.all([
      import('@toruslabs/torus-embed'),
      import('web3'),
    ]);

    const torus = new Torus({});

    await torus.init({
      network: {
        host: 'mumbai',
        chainId: +(process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID ?? '0'),
      },
      showTorusButton: false,
    });

    await torus.login({});

    const web3 = new Web3(torus.provider);

    const nativeLogout = torus.logout.bind(torus);
    torus.logout = async () => {
      setCachedTorus(undefined);
      await nativeLogout();
    };

    setCachedTorus({ torus, web3 });

    return { torus, web3 };
  }, [cachedTorus, setCachedTorus]);
}

export function useWeb3Context() {
  return {
    getMetamask: useMetamaskGetter(),
    getTorus: useTorusGetter(),
  };
}
