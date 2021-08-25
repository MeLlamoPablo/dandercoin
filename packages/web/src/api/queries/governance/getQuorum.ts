import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_QUORUM_QUERY_KEY = () => ['governance/getQuorum'];

export default function useGetQuorumQuery(): QueryFunction<string> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(async () => {
    const Governor = await getGovernorContract();

    return await Governor?.methods.quorumVotes().call();
  }, [getGovernorContract]);
}
