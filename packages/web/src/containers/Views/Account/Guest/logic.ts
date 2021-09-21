import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { GET_WALLET_QUERY_KEY } from '$/api/queries/wallet/getWallet';
import type { WalletQuery } from '$/api/hooks/wallet/useWallet';
import {
  hasMetamask,
  useGetMetamask,
  useGetTorus,
} from '$/containers/Services/Web3Service';
import zeroX from '$/utils/zeroX';

export function useHandleConnectMetamask() {
  const client = useQueryClient();
  const getMetamask = useGetMetamask();

  return useCallback(async () => {
    const { metamask, web3 } = (await getMetamask()) ?? {
      metamask: undefined,
      web3: undefined,
    };

    if (metamask && web3) {
      // Only request accounts. "useMetamaskSync" on "useWallet" will take care
      // of saving the account state.
      const [accounts, chainId] = await Promise.all([
        metamask.request({ method: 'eth_requestAccounts' }),
        web3.eth.getChainId(),
      ]);

      client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), {
        account: accounts[0],
        chainId: zeroX(chainId),
        provider: 'metamask',
      });
    } else {
      window.open('https://metamask.io/download', '_blank');
    }
  }, [client]);
}

export function useHandleConnectTorus() {
  const client = useQueryClient();
  const getTorus = useGetTorus();

  return useCallback(async () => {
    const { web3 } = await getTorus();

    if (web3) {
      const [accounts, chainId] = await Promise.all([
        web3.eth.getAccounts(),
        web3.eth.getChainId(),
      ]);

      client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), {
        account: accounts[0],
        chainId: `0x${chainId}`,
        provider: 'torus',
      });
    }
  }, [client, getTorus]);
}

export function useHasMetamask() {
  // Even though Metamask detection is sync, wa make it async so the initial
  // state is synchronized with the server (which obviously doesn't have
  // Metamask) and Next doesn't report a warning.
  const [_hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    setHasMetamask(hasMetamask());
  }, [setHasMetamask]);

  return _hasMetamask;
}
