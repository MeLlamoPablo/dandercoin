export const GET_WALLET_QUERY_KEY = () => 'wallet/getWallet';

const getWalletQuery = () => ({
  account: undefined as string | undefined,
  chainId: undefined as string | undefined,
  provider: undefined as 'metamask' | 'torus' | undefined,
});

export default function useGetWalletQuery() {
  return getWalletQuery;
}
