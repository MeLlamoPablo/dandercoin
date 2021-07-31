import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_PROPOSAL_QUERY_KEY = ({
  proposalId,
}: {
  proposalId: number;
}) => ['governance/getProposal', proposalId] as const;

function normalizeProposalState(input: string) {
  switch (input) {
    case '0':
      return 'pending' as const;
    case '1':
      return 'active' as const;
    case '2':
      return 'canceled' as const;
    case '3':
      return 'defeated' as const;
    case '4':
      return 'succeeded' as const;
    case '5':
      return 'queued' as const;
    case '6':
      return 'expired' as const;
    case '7':
      return 'executed' as const;
    default:
      return 'pending' as const;
  }
}

export type Proposal = {
  id: number;
  state: ReturnType<typeof normalizeProposalState>;
};

export default function useGetProposalQuery(): QueryFunction<
  Proposal | undefined,
  ReturnType<typeof GET_PROPOSAL_QUERY_KEY>
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(
    async ({ queryKey: [, proposalId] }) => {
      const Governor = await getGovernorContract();

      // Adding 1 because the first proposal is empty, and we subtract 1 in
      // getProposalCount
      const proposal = await Governor?.methods.proposals(proposalId + 1).call();
      const state = await Governor?.methods.state(proposalId + 1).call();

      return {
        id: +proposal.id - 1,
        state: normalizeProposalState(state),
      };
    },
    [getGovernorContract],
  );
}
