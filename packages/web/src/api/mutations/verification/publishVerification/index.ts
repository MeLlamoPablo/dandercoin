import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import useGetIdentityOracleContract from '$/api/hooks/contracts/useGetIdentityOracleContract';

import type {
  PublishVerificationResponse,
  PublishVerificationVariables,
} from './types';

export default function usePublishVerificationMutation(): MutationFunction<
  PublishVerificationResponse,
  PublishVerificationVariables
> {
  const getIdentityOracle = useGetIdentityOracleContract();

  return useCallback(
    async ({ address, email, signature, timestamp }) => {
      const IdentityOracle = await getIdentityOracle();

      await IdentityOracle?.methods
        .registerIdentity(address, email, timestamp, signature)
        .send({ from: address });
    },
    [getIdentityOracle],
  );
}
