import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetDandercoinContract from '$/api/hooks/contracts/useGetDandercoinContract';

export const GET_DANDER_DELEGATE_QUERY_KEY = ({
  account,
}: {
  account: string;
}) => ['dander/getDanderDelegate', account];

export default function useGetDanderDelegateQuery(): QueryFunction<
  string | undefined
> {
  const getDandercoin = useGetDandercoinContract();

  return useCallback(
    async ({ queryKey }) => {
      const [, account] = queryKey as [string, string];
      const Dandercoin = await getDandercoin();

      return await Dandercoin?.methods.delegates(account).call();
    },
    [getDandercoin],
  );
}
