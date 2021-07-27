import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetDandercoinContract from '$/api/hooks/contracts/useGetDandercoinContract';

export const GET_DANDER_TOTAL_SUPPLY_QUERY_KEY = () => [
  'dander/getDanderTotalSupply',
];

export default function useGetDanderTotalSupplyQuery(): QueryFunction<
  string | undefined
> {
  const getDandercoin = useGetDandercoinContract();

  return useCallback(async () => {
    const Dandercoin = await getDandercoin();

    return await Dandercoin?.methods.totalSupply().call();
  }, [getDandercoin]);
}
