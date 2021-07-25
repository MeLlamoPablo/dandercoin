import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetVotesQuery, {
  GET_VOTES_QUERY_KEY,
} from '$/api/queries/dander/getVotes';

export default function useVotes({ account }: { account?: string }) {
  const { web3 } = useWeb3();

  const { data: rawVotes } = useQuery(
    GET_VOTES_QUERY_KEY({
      account: account ?? '',
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct' && !!account,
      queryFn: useGetVotesQuery(),
    },
  );

  const data = useMemo(
    () => (rawVotes ? web3?.utils.toBN(rawVotes) : undefined),
    [rawVotes, web3],
  );

  return { data };
}
