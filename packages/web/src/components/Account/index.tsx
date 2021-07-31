import { memo } from 'react';
import type { FC } from 'react';

import gravatar from '$/utils/gravatar';

import { Address, Avatar, Container, Email } from './styles';
import type { Props } from './types';

const Account: FC<Props> = ({ address, email }) => {
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <Container
      href={`${process.env.NEXT_PUBLIC_ETHEREUM_BLOCK_EXPLORER_URL}/address/${address}`}
      rel="noreferrer noopener"
      target="_blank"
    >
      <Avatar src={gravatar(email ?? address, 120)} alt={email ?? address} />
      <Email>{email ?? address}</Email>
      {email && <Address>{shortAddress}</Address>}
    </Container>
  );
};

export default memo(Account);
