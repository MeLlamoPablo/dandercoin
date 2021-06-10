import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import type { WalletQuery } from '$/api/hooks/wallet/useWallet';
import { GET_WALLET_QUERY_KEY } from '$/api/queries/wallet/getWallet';
import useVerificationActions from '$/api/hooks/verification/useVerificationActions';

export function usePublishIdentity() {
  const client = useQueryClient();
  const {
    query: { email, sig, t },
  } = useRouter();
  const {
    isLoading,
    isPublishIdentitySuccess,
    publishVerification,
  } = useVerificationActions();

  const onPublishIdentity = useCallback(() => {
    const wallet = client.getQueryData<WalletQuery>(GET_WALLET_QUERY_KEY());
    const address = wallet?.account;

    if (
      !address ||
      typeof email !== 'string' ||
      typeof sig !== 'string' ||
      typeof t !== 'string'
    ) {
      return;
    }

    publishVerification({
      address,
      email,
      signature: sig,
      timestamp: +t,
    });
  }, [client, email, publishVerification, sig, t]);

  return { isLoading, isSuccess: isPublishIdentitySuccess, onPublishIdentity };
}
