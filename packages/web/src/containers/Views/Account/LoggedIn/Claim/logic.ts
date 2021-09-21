import { useCallback } from 'react';

import useDanderActions from '$/api/hooks/dander/useDanderActions';

import type { Props } from './types';

export function useClaimDanderHandler({
  account,
}: {
  account: Props['account'];
}) {
  const { claimDander, isClaimDanderSuccess, isLoading } = useDanderActions();

  const onClaimDander = useCallback(() => {
    if (!account) {
      return;
    }

    claimDander({ address: account });
  }, [account, claimDander]);

  return {
    isClaimDanderSuccess,
    isLoading,
    onClaimDander,
  };
}
