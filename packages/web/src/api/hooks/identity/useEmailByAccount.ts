import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetEmailByAccountQuery, {
  GET_EMAIL_BY_ACCOUNT_QUERY_KEY,
} from '$/api/queries/identity/getEmailByAccount';

export default function useEmailByAccount({ account }: { account?: string }) {
  const { data, isLoading } = useQuery(
    GET_EMAIL_BY_ACCOUNT_QUERY_KEY({
      account: account ?? '',
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct' && !!account,
      queryFn: useGetEmailByAccountQuery(),
    },
  );

  return { data, isLoading };
}
