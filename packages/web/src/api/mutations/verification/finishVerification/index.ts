import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import type {
  FinishVerificationResponse,
  FinishVerificationVariables,
} from './types';

export default function useFinishVerificationMutation(): MutationFunction<
  FinishVerificationResponse,
  FinishVerificationVariables
> {
  return useCallback(async ({ address, email, signature, token }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IDENTITY_API_ENDPOINT}/verifications/${email}`,
      {
        body: JSON.stringify({
          address,
          signature,
          token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'put',
      },
    );

    if (response.status === 200) {
      const body = await response.json();

      return {
        signature: body.signature,
        timestamp: body.timestamp,
      };
    }

    throw response;
  }, []);
}
