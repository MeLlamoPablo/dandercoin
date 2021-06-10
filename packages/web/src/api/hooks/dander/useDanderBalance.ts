import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetDanderBalanceQuery, {
  GET_DANDER_BALANCE_QUERY_KEY,
} from '$/api/queries/dander/getDanderBalance';

export default function useDanderBalance({ account }: { account?: string }) {
  const { web3 } = useWeb3();

  const { data: rawBalance } = useQuery(
    GET_DANDER_BALANCE_QUERY_KEY({
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
