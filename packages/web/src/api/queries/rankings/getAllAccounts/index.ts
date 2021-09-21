import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetIdentityOracleContract from '$/api/hooks/contracts/useGetIdentityOracleContract';

import type { GetAllAccountsResponse } from './types';

export const GET_ALL_ACCOUNTS_QUERY_KEY = ({ page }: { page: number }) =>
  ['rankings/getAllAccounts', page] as const;

export default function useGetAllAccountsQuery(): QueryFunction<
  GetAllAccountsResponse,
  ReturnType<typeof GET_ALL_ACCOUNTS_QUERY_KEY>
> {
  const getIdentityOracle = useGetIdentityOracleContract();

  return useCallback(
    async ({ queryKey: [, page] }) => {
      const IdentityOracle = await getIdentityOracle();

      return await IdentityOracle?.methods.getAccounts(page, 200).call();
    },
    [getIdentityOracle],
  );
}
