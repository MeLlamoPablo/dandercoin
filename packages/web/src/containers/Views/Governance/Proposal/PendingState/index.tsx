import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { memo } from 'react';

import useConnect from './connect';
import { Container, ProposalState, Text } from './styles';
import type { Props } from './types';

function PendingState({ proposal }: Props) {
  const { remainingMilliseconds } = useConnect({ proposal });

  return (
    <Container>
      <ProposalState state="pending" />
      {typeof remainingSeconds !== 'undefined' && (
        <Text>
          La jornada de reflexión termina en aproximadamente{' '}
          {formatDistanceToNow(Date.now() + remainingMilliseconds, { locale: es })}.
        </Text>
      )}
    </Container>
  );
}

export default memo(PendingState);
