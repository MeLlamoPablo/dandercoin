import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_PROPOSAL_COUNT_QUERY_KEY = () => [
  'governance/getProposalCount',
];

export default function useGetProposalCountQuery(): QueryFunction<
  string | undefined
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(async () => {
    const Governor = await getGovernorContract();

    return await Governor?.methods.proposalCount().call();
  }, [getGovernorContract]);
}
