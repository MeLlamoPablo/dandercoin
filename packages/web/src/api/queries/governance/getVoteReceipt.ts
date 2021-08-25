import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_VOTE_RECEIPT_QUERY_KEY = ({
  account,
  proposalId,
}: {
  account: string;
  proposalId: number;
}) => ['governance/getVoteReceipt', proposalId, account] as const;

export type VoteReceipt = {
  hasVoted: boolean;
  type: 'for' | 'against' | 'abstain';
};

export default function useGetVoteReceiptQuery(): QueryFunction<
  VoteReceipt | undefined,
  ReturnType<typeof GET_VOTE_RECEIPT_QUERY_KEY>
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(
    async ({ queryKey: [, proposalId, account] }) => {
      const Governor = await getGovernorContract();

      const receipt = await Governor?.methods
        .getReceipt(proposalId + 1, account)
        .call();

      return {
        hasVoted: receipt.hasVoted,
        type: (() => {
          switch (+receipt.support) {
            case 1:
            default:
              return 'for';
            case 0:
              return 'against';
            case 2:
              return 'abstain';
          }
        })(),
      };
    },
    [getGovernorContract],
  );
}
