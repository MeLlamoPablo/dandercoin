import { useCallback } from 'react';

import useDanderDelegate from '$/api/hooks/dander/useDanderDelegate';
import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';
import useLatestProposals from '$/api/hooks/governance/useLatestProposals';
import useWallet from '$/api/hooks/wallet/useWallet';
import { useRouter } from 'next/router';

export default function useConnect() {
  const { asPath: url } = useRouter();

  const { data: wallet } = useWallet();
  const account = wallet?.account;

  const { data: currentDelegate } = useDanderDelegate({ account });
  const { data: proposals } = useLatestProposals();

  const { delegate } = useGovernanceActions();

  const onSelfDelegate = useCallback(() => {
    if (!account) {
      return;
    }

    delegate(account);
  }, [account, delegate]);

  return {
    handle: { selfDelegate: onSelfDelegate },
    isSelfDelegating: account?.toLowerCase() === currentDelegate?.toLowerCase(),
    proposals,
    url,
  };
}
