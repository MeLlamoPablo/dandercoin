import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

import type { VoteResponse, VoteVariables } from './types';

export default function useVoteMutation(): MutationFunction<
  VoteResponse,
  VoteVariables
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(
    async ({ from, proposalId, reason, type }) => {
      const Governor = await getGovernorContract();

      const support = (() => {
        switch (type) {
          case 'for':
          default:
            return 1;
          case 'against':
            return 0;
          case 'abstain':
            return 2;
        }
      })();

      if (reason) {
        await Governor?.methods
          .castVoteWithReason(proposalId + 1, support, reason)
          .send({ from });
      } else {
        await Governor?.methods
          .castVote(proposalId + 1, support)
          .send({ from });
      }
    },
    [getGovernorContract],
  );
}
