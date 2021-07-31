import { useCallback, useMemo } from 'react';

import useDanderDelegate from '$/api/hooks/dander/useDanderDelegate';
import useDanderTotalSupply from '$/api/hooks/dander/useDanderTotalSupply';
import useVotes from '$/api/hooks/dander/useVotes';
import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';
import useWallet from '$/api/hooks/wallet/useWallet';
import { parseWeiAmount } from '$/utils/formatWeiAmount';

import type { Props } from './types';

export default function useConnect({
  politician,
}: {
  politician: Props['politician'];
}) {
  const { data: wallet } = useWallet();
  const { address: politicianAddress } = politician;
  const account = wallet?.account;

  const { data: currentDelegate } = useDanderDelegate({ account });
  const { data: totalSupply } = useDanderTotalSupply();
  const { data: votes } = useVotes({ account: politicianAddress });

  const votesPercent = useMemo(() => {
    if (!totalSupply || !votes) {
      return undefined;
    }

    const totalSupplyUnits = parseWeiAmount(totalSupply);
    const votesUnits = parseWeiAmount(votes);

    return votesUnits / totalSupplyUnits;
  }, [totalSupply, votes]);

  const { delegate } = useGovernanceActions();

  const onDelegate = useCallback(() => {
    delegate(politicianAddress);
  }, [delegate, politicianAddress]);

  return {
    handle: { delegate: onDelegate },
    isCurrentDelegate: currentDelegate === politicianAddress,
    votes,
    votesPercent,
  };
}
