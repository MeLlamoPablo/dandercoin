import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetDanderBalanceQuery, {
  GET_CLAIMABLE_DANDER_QUERY_KEY,
} from '$/api/queries/dander/getClaimableDander';

export default function useClaimableDander({ account }: { account?: string }) {
  const { web3 } = useWeb3();

  const { data: rawBalance } = useQuery(
    GET_CLAIMABLE_DANDER_QUERY_KEY({
      account: account ?? '',
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct' && !!account,
      queryFn: useGetDanderBalanceQuery(),
    },
  );
  const data = useMemo(() => rawBalance && web3?.utils.toBN(rawBalance), [
    rawBalance,
    web3,
  ]);

  return { data };
}
