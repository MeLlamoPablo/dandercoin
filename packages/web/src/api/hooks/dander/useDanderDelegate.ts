import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetDanderDelegateQuery, {
  GET_DANDER_DELEGATE_QUERY_KEY,
} from '$/api/queries/dander/getDanderDelegate';

export default function useDanderDelegate({ account }: { account?: string }) {
  const { data } = useQuery(
    GET_DANDER_DELEGATE_QUERY_KEY({
      account: account ?? '',
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct' && !!account,
      queryFn: useGetDanderDelegateQuery(),
    },
  );

  return { data };
}
