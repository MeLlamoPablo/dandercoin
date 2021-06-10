import useEmailByAccount from '$/api/hooks/identity/useEmailByAccount';
import useWallet from '$/api/hooks/wallet/useWallet';

import { useSubmitHandler } from './logic';

export default function useConnect() {
  const { data: wallet } = useWallet();
  const {
    isLoading,
    isSendVerificationEmailSuccess,
    onSubmit,
  } = useSubmitHandler();

  const { data: email } = useEmailByAccount({
    account: wallet?.account,
  });

  return {
    email,
    isLoading,
    isSendVerificationEmailSuccess,
    handle: {
      submit: onSubmit,
    },
  };
}
