import { useRouter } from 'next/router';
import { stringify } from 'query-string';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import useVerificationActions from '$/api/hooks/verification/useVerificationActions';
import type { WalletQuery } from '$/api/hooks/wallet/useWallet';
import useWalletActions from '$/api/hooks/wallet/useWalletActions';
import { GET_WALLET_QUERY_KEY } from '$/api/queries/wallet/getWallet';

export function useSignVerificationToken() {
  const client = useQueryClient();
  const {
    pathname,
    query: { email, token },
    replace,
  } = useRouter();

  const { finishVerification, isLoading } = useVerificationActions();
  const { sign } = useWalletActions();

  const onSignVerificationToken = useCallback(async () => {
    const wallet = client.getQueryData<WalletQuery>(GET_WALLET_QUERY_KEY());
    const address = wallet?.account;

    if (!address || typeof email !== 'string' || typeof token !== 'string') {
      return;
    }

    const signature = await sign({
      domain: {
        name: 'Dandercoin Identity Verification',
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      message: {
        email,
        token,
      },
      primaryType: 'Identity',
      types: {
        Identity: [
          { name: 'email', type: 'string' },
          { name: 'token', type: 'string' },
        ],
      },
    });

    const {
      signature: verificationSignature,
      timestamp,
    } = await finishVerification({
      address,
      email,
      signature,
      token,
    });

    await replace(
      `${pathname}?${stringify({
        email,
        sig: verificationSignature,
        t: timestamp,
      })}`,
    );
  }, [client, email, finishVerification, pathname, replace, sign, token]);

  return { isLoading, onSignVerificationToken };
}
