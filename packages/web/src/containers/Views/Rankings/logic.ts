import BN from 'bn.js';
import { useQueryClient } from 'react-query';

import useAllAccounts from '$/api/hooks/rankings/useAllAccounts';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import { GET_DANDER_BALANCE_QUERY_KEY } from '$/api/queries/dander/getDanderBalance';

import { useMemo } from 'react';

export function useRankings() {
  const client = useQueryClient();
  const { web3 } = useWeb3();

  const { data: accounts } = useAllAccounts();

  /*
   * This is a bit unorthodox, but in order to get the balances we need to
   * query each account individually. Since we can't use hooks inside loops we
   * have to render the Participant children first, and then the query will be
   * made.
   *
   * Then, when this hook re-renders, we will have the proper values loaded and
   * we will be able to sort the data.
   */
  return useMemo(() => {
    const getBalance = (account: string) => {
      const data = client.getQueryData<string | undefined>(
        GET_DANDER_BALANCE_QUERY_KEY({ account }),
      );

      return (typeof data === 'string' && web3?.utils.toBN(data)) || new BN(0);
    };

    return accounts.sort((a, b) =>
      getBalance(b.address).cmp(getBalance(a.address)),
    );
  }, [accounts, client, web3]);
}
