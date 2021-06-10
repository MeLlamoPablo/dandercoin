import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import useGetWalletQuery, {
  GET_WALLET_QUERY_KEY,
} from '$/api/queries/wallet/getWallet';
import { useGetMetamask } from '$/containers/Services/Web3Service';

export type WalletQuery = ReturnType<ReturnType<typeof useGetWalletQuery>>;

function useMetamaskSync({
  account,
  provider,
}: {
  account: string | undefined;
  provider: WalletQuery['provider'];
}) {
  const client = useQueryClient();
  const getMetamask = useGetMetamask();

  useEffect(() => {
    void (async () => {
      const { metamask } = (await getMetamask()) ?? { metamask: undefined };

      metamask?.on?.(
        'accountsChanged',
        (newAccounts: [string, ...string[]]) => {
          client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), (old) => ({
            account: newAccounts[0],
            chainId: old?.chainId,
            provider: 'metamask',
          }));
        },
      );

      metamask?.on?.('chainChanged', (newChainId: string) => {
        client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), (old) => ({
          account: old?.account,
          chainId: newChainId,
          provider: 'metamask',
        }));
      });
    })();
  }, [client]);

  useEffect(() => {
    void (async () => {
      const { web3 } = (await getMetamask()) ?? { web3: undefined };

      // If the user previously connected MetaMask, request accounts again to
      // check whether they manually disconnected. In that case, prompt them for
      // re-connection. If they reject, remove the previously saved account.
      // There is no way to query accounts without prompting:
      // https://github.com/MetaMask/metamask-extension/issues/5404#issuecomment-474253848
      if (account && provider === 'metamask') {
        web3?.eth.requestAccounts().catch(() => {
          client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), (old) => ({
            account: undefined,
            chainId: old?.chainId,
            provider: undefined,
          }));
        });
      }
    })();
  }, [account, client, provider]);
}

export default function useWallet() {
  const { data } = useQuery<WalletQuery>(GET_WALLET_QUERY_KEY(), {
    cacheTime: Infinity,
    queryFn: useGetWalletQuery(),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useMetamaskSync({
    account: data?.account,
    provider: data?.provider,
  });

  return { data };
}
