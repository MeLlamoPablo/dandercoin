import useWallet from '$/api/hooks/wallet/useWallet';

export default function useConnect() {
  const { data } = useWallet();

  const account = data?.account;

  return {
    account,
  };
}
