import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import useGetDandercoinContract from '$/api/hooks/contracts/useGetDandercoinContract';
import type { WalletQuery } from '$/api/hooks/wallet/useWallet';
import { GET_WALLET_QUERY_KEY } from '$/api/queries/wallet/getWallet';
import { useGetMetamask, useGetTorus } from '$/containers/Services/Web3Service';
import zeroX from '$/utils/zeroX';

import useWeb3 from './useWeb3';

const BLOCK_EXPLORER_URL =
  process.env.NEXT_PUBLIC_ETHEREUM_BLOCK_EXPLORER_URL ?? '';
const CHAIN_ID = +(process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID ?? '0');
const CHAIN_NAME = process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_NAME ?? '';
const NATIVE_CURRENCY_DECIMALS = 18;
const NATIVE_CURRENCY_NAME =
  process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_NATIVE_CURRENCY_NAME ?? '';
const RPC_URL = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ?? '';

export default function useWalletActions() {
  const client = useQueryClient();
  const { getWeb3 } = useWeb3();
  const getDandercoin = useGetDandercoinContract();
  const getMetamask = useGetMetamask();
  const getTorus = useGetTorus();

  const logOutMetamask = useCallback(() => {
    client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), {
      account: undefined,
      chainId: undefined,
      provider: undefined,
    });
  }, [client]);

  const logOutTorus = useCallback(async () => {
    const { torus } = await getTorus();
    await torus.logout();

    client.setQueryData<WalletQuery>(GET_WALLET_QUERY_KEY(), {
      account: undefined,
      chainId: undefined,
      provider: undefined,
    });
  }, [client]);

  const openTorusWallet = useCallback(async () => {
    const { torus } = await getTorus();
    torus.showWallet('home');
  }, [getTorus]);

  const sign = useCallback(
    async (params: any) => {
      const wallet = client.getQueryData<WalletQuery>(GET_WALLET_QUERY_KEY());
      const web3 = await getWeb3();

      return web3?.currentProvider.request?.({
        method: 'eth_signTypedData_v4',
        params: [
          wallet?.account,
          JSON.stringify({
            ...params,
            domain: {
              ...params.domain,
              chainId: wallet?.chainId,
              version: '1',
            },
            types: {
              ...params.types,
              EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
              ],
            },
          }),
        ],
        from: wallet?.account,
      });
    },
    [client, getWeb3],
  );

  const setupMetamaskNetwork = useCallback(async () => {
    const { metamask } = (await getMetamask()) ?? {
      metamask: undefined,
    };

    await metamask?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: zeroX(CHAIN_ID),
          chainName: CHAIN_NAME,
          nativeCurrency: {
            name: NATIVE_CURRENCY_NAME,
            symbol: NATIVE_CURRENCY_NAME,
            decimals: NATIVE_CURRENCY_DECIMALS,
          },
          rpcUrls: [RPC_URL],
          blockExplorerUrls: [BLOCK_EXPLORER_URL],
          iconUrls: [],
        },
      ],
    });
  }, [getMetamask]);

  const setupMetamaskToken = useCallback(async () => {
    const [Dandercoin, { metamask }] = await Promise.all([
      getDandercoin(),
      getMetamask().then((result) => result ?? { metamask: undefined }),
    ]);

    await metamask?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: Dandercoin?.options.address,
          symbol: 'DANDER',
          decimals: 18,
          image: `${window.location.origin}/images/erc20-metamask-logo.png`,
        },
        chainId: zeroX(CHAIN_ID),
        chainName: CHAIN_NAME,
        nativeCurrency: {
          name: NATIVE_CURRENCY_NAME,
          symbol: NATIVE_CURRENCY_NAME,
          decimals: NATIVE_CURRENCY_DECIMALS,
        },
        rpcUrls: [RPC_URL],
        blockExplorerUrls: [BLOCK_EXPLORER_URL],
        iconUrls: [],
      },
    });
  }, [getDandercoin, getMetamask]);

  return {
    logOutMetamask,
    logOutTorus,
    openTorusWallet,
    sign,
    setupMetamaskNetwork,
    setupMetamaskToken,
  };
}
