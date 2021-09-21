import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetAllAccountsQuery, {
  GET_ALL_ACCOUNTS_QUERY_KEY,
} from '$/api/queries/rankings/getAllAccounts';
import { useMemo } from 'react';

export default function useAllAccounts() {
  const { data: raw } = useQuery(
    GET_ALL_ACCOUNTS_QUERY_KEY({
      page: 1,
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct',
      queryFn: useGetAllAccountsQuery(),
    },
  );

  const normalized = useMemo(
    () =>
      raw
        ?.filter(
          ([address, email]) =>
            address !== '0x0000000000000000000000000000000000000000' && !!email,
        )
        .map(([address, email]) => ({
          address: address.toLowerCase(),
          email,
        })) ?? [],
    [raw],
  );

  return { data: normalized };
}
