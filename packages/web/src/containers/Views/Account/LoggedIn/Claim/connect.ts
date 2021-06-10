import useClaimableDander from '$/api/hooks/dander/useClaimableDander';

import type { Props } from './types';
import { useClaimDanderHandler } from './logic';

export default function useConnect({ account }: { account: Props['account'] }) {
  const { data: claimableDander } = useClaimableDander({
    account,
  });

  const {
    isClaimDanderSuccess,
    isLoading,
    onClaimDander,
  } = useClaimDanderHandler({ account });

  return {
    claimableDander,
    handle: {
      claimDander: onClaimDander,
    },
    isClaimDanderSuccess,
    isLoading,
  };
}
