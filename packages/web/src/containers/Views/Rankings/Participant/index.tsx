import type { FC } from 'react';

import Account from '$/components/Account';
import { formatWeiAmount } from '$/utils/formatWeiAmount';

import useConnect from './connect';
import { Balance, Container, Number } from './styles';
import type { Props } from './types';

const Participant: FC<Props> = ({ address, email, index }) => {
  const { balance } = useConnect({ address });

  return (
    <Container>
      <Number>#{index + 1}</Number>
      <Account address={address} email={email} />
      <Balance>{balance ? formatWeiAmount(balance) : '...'}</Balance>
    </Container>
  );
};

export default Participant;
