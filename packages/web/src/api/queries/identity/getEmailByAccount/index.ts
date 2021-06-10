import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetIdentityOracleContract from '$/api/hooks/contracts/useGetIdentityOracleContract';
import useWeb3 from '$/api/hooks/wallet/useWeb3';

import type { GetEmailByAccountResponse } from './types';

export const GET_EMAIL_BY_ACCOUNT_QUERY_KEY = ({
  account,
}: {
  account: string;
}) => ['identity/getEmailByAccount', account];

export default function useGetEmailByAccountQuery(): QueryFunction<GetEmailByAccountResponse> {
  const { getWeb3 } = useWeb3();
  const getIdentityOracleContract = useGetIdentityOracleContract();

  return useCallback(
    async ({ queryKey }) => {
      const [, account] = queryKey as [string, string];
      const IdentityOracle = await getIdentityOracleContract();

      return (
        (await IdentityOracle?.methods.getEmailByAccount(account).call()) ||
        undefined
      );
    },
    [getIdentityOracleContract, getWeb3],
  );
}
