import useDanderBalance from '$/api/hooks/dander/useDanderBalance';
import useEmailByAccount from '$/api/hooks/identity/useEmailByAccount';
import useWallet from '$/api/hooks/wallet/useWallet';
import useWalletActions from '$/api/hooks/wallet/useWalletActions';

export default function useConnect() {
  const { data } = useWallet();
  const {
    logOutMetamask,
    logOutTorus,
    openTorusWallet,
    setupMetamaskToken,
  } = useWalletActions();

  const account = data?.account;
  const provider = data?.provider;

  const { data: balance } = useDanderBalance({ account: data?.account });
  const { data: email, isLoading: emailLoading } = useEmailByAccount({
    account: data?.account,
  });

  return {
    account,
    balance,
    email,
    emailLoading,
    handle: {
      logOutMetamask,
      logOutTorus,
      openTorusWallet,
      setupMetamaskToken,
    },
    provider,
  };
}
