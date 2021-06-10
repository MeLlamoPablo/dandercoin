import type { Overwrite } from 'utility-types';
import type Web3 from 'web3';
import type { AbstractProvider } from 'web3-core';

import { useGetMetamask, useGetTorus } from '$/containers/Services/Web3Service';
import usePromise from '$/utils/usePromise';

import useWallet from './useWallet';
import { useCallback } from 'react';

type SafeWeb3 = Overwrite<
  Web3,
  {
    currentProvider: AbstractProvider;
  }
>;

const noOpGetter = () => Promise.resolve(undefined);

export function useProviderGetter(
  provider: 'metamask' | 'torus' | undefined,
): () => Promise<{ web3: Web3 } | undefined> {
  const getMetamask = useGetMetamask();
  const getTorus = useGetTorus();

  switch (provider) {
    case 'metamask':
      return getMetamask;
    case 'torus':
      return getTorus;
    default:
      return noOpGetter;
  }
}

export default function useWeb3(): {
  getWeb3: () => Promise<SafeWeb3 | undefined>;
  web3: Web3 | undefined;
} {
  const { data } = useWallet();

  const getProvider = useProviderGetter(data?.provider);

  const provider = usePromise(useProviderGetter(data?.provider));

  const getWeb3 = useCallback(
    () =>
      getProvider().then((it) => {
        if (
          !it?.web3.currentProvider ||
          typeof it?.web3.currentProvider === 'string' ||
          !('request' in it?.web3.currentProvider) ||
          typeof it?.web3.currentProvider.request !== 'function'
        ) {
          return undefined;
        }

        return it.web3 as SafeWeb3;
      }),
    [getProvider],
  );

  return {
    getWeb3,
    web3: provider?.web3,
  };
}
