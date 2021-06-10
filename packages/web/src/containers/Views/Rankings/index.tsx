import type { FC } from 'react';

import Participant from './Participant';
import useConnect from './connect';
import { Container, Ranking } from './styles';

const Rankings: FC = () => {
  const { accounts } = useConnect();

  return (
    <Container>
      <Ranking>
        {accounts.map(({ address, email }, i) => (
          <Participant
            address={address}
            key={address}
            email={email}
            index={i}
          />
        ))}
      </Ranking>
    </Container>
  );
};

export default Rankings;
