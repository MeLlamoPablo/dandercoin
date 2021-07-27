import { useCallback } from 'react';

import useDanderDelegate from '$/api/hooks/dander/useDanderDelegate';
import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';
import useWallet from '$/api/hooks/wallet/useWallet';

export default function useConnect() {
  const { data: wallet } = useWallet();
  const account = wallet?.account;

  const { data: currentDelegate } = useDanderDelegate({ account });

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
  };
}
