import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import type {
  SendVerificationEmailResponse,
  SendVerificationEmailVariables,
} from './types';

export default function useSendVerificationEmailMutation(): MutationFunction<
  SendVerificationEmailResponse,
  SendVerificationEmailVariables
> {
  return useCallback(async ({ email }) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_IDENTITY_API_ENDPOINT}/verifications`,
      {
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      },
    );

    return { email };
  }, []);
}
