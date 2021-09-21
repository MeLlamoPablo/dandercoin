import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import useGetDistributorContract from '$/api/hooks/contracts/useGetDistributorContract';

import type { ClaimDanderResponse, ClaimDanderVariables } from './types';

export default function useClaimDanderMutation(): MutationFunction<
  ClaimDanderResponse,
  ClaimDanderVariables
> {
  const getDistributor = useGetDistributorContract();

  return useCallback(
    async ({ address }) => {
      const Distributor = await getDistributor();

      await Distributor?.methods.claimFor(address).send({ from: address });
    },
    [getDistributor],
  );
}
