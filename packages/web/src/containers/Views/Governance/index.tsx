import type { FC } from 'react';

import useGovernanceActions from '$/api/hooks/governance/useGovernanceActions';
import useWallet from '$/api/hooks/wallet/useWallet';

import { Container } from './styles';
import { useCallback } from 'react';

const Bank: FC = () => {
  const { data: { account } = {} } = useWallet();
  const { delegate } = useGovernanceActions();

  const onClick = useCallback(() => {
    if (account) {
      delegate(account);
    }
  }, [account, delegate]);

  return (
    <Container>
      <button onClick={onClick}>Delegarme mis DANDER</button>
    </Container>
  );
};

export default Bank;
