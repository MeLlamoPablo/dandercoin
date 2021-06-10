import type { FC } from 'react';

import { formatWeiAmount } from '$/utils/formatWeiAmount';

import useConnect from './connect';
import { Button, Container, Gif, Title } from './styles';
import type { Props } from './types';

const Claim: FC<Props> = ({ account }) => {
  const {
    claimableDander,
    handle,
    isClaimDanderSuccess,
    isLoading,
  } = useConnect({ account });

  if (!claimableDander || claimableDander.isZero()) {
    return null;
  }

  return (
    <Container>
      <Title>¡Te corresponden {formatWeiAmount(claimableDander)}!</Title>
      <Gif
        alt=""
        src="https://media.giphy.com/media/5VKbvrjxpVJCM/source.gif"
      />
      <Button
        disabled={isClaimDanderSuccess || isLoading}
        onClick={handle.claimDander}
      >
        LOS QUIERO
      </Button>
    </Container>
  );
};

export default Claim;
