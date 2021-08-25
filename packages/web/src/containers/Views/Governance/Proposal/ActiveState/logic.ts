import { FormEvent, useCallback } from 'react';

import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export function useVoteHandler({ proposalId }: { proposalId: number }) {
  const { isLoading, vote } = useGovernanceActions();

  const onVote = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nativeEvent = e.nativeEvent as SubmitEvent;
      const voteType = nativeEvent.submitter.dataset.voteType as
        | 'for'
        | 'against'
        | 'abstain';
      const reason = (e.target as HTMLFormElement).reason.value as string;

      vote({
        proposalId,
        reason,
        type: voteType,
      });
    },
    [proposalId, vote],
  );

  return { isLoading, onVote };
}
