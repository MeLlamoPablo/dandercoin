import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetDanderTotalSupplyQuery, {
  GET_DANDER_TOTAL_SUPPLY_QUERY_KEY,
} from '$/api/queries/dander/getDanderTotalSupply';

export default function useDanderTotalSupply() {
  const { web3 } = useWeb3();

  const { data: rawSupply } = useQuery(GET_DANDER_TOTAL_SUPPLY_QUERY_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetDanderTotalSupplyQuery(),
  });

  const data = useMemo(() => rawSupply && web3?.utils.toBN(rawSupply), [
    rawSupply,
    web3,
  ]);

  return { data };
}
