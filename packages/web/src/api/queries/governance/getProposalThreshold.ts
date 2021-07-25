import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_PROPOSAL_THRESHOLD_QUERY_KEY = () => [
  'governance/getProposalThreshold',
];

export default function useGetProposalThresholdQuery(): QueryFunction<
  string | undefined
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(async () => {
    const Governor = await getGovernorContract();

    return await Governor?.methods.proposalThreshold().call();
  }, [getGovernorContract]);
}
