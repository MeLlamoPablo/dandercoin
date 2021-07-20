import { useCallback } from 'react';

import useVotes from '$/api/hooks/dander/useVotes';
import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';
import useProposalThreshold from '$/api/hooks/governance/useProposalThreshold';
import type { FormModel } from '$/components/ProposeForm/types';

export function useCanPropose({
  activeAccount,
}: {
  activeAccount: string | undefined;
}) {
  const { data: votes } = useVotes({ account: activeAccount });
  const { data: proposalThreshold } = useProposalThreshold();

  if (!votes || !proposalThreshold) {
    return 'loading' as const;
  }

  if (votes.gt(proposalThreshold)) {
    return 'yes' as const;
  }

  return 'no' as const;
}

export function useSubmitHandler() {
  const { propose } = useGovernanceActions();

  return useCallback(
    (values: FormModel) => {
      propose(values);
    },
    [propose],
  );
}
