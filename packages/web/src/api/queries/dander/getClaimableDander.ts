import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetDistributorContract from '$/api/hooks/contracts/useGetDistributorContract';

export const GET_CLAIMABLE_DANDER_QUERY_KEY = ({
  account,
}: {
  account: string;
}) => ['dander/getClaimableDander', account];

export default function useGetDanderBalanceQuery(): QueryFunction<
  string | undefined
> {
  const getDistributor = useGetDistributorContract();

  return useCallback(
    async ({ queryKey }) => {
      const [, account] = queryKey as [string, string];
      const Distributor = await getDistributor();

      return await Distributor?.methods
        .getClaimableBalanceByAddress(account)
        .call();
    },
    [getDistributor],
  );
}
