import { memo } from 'react';
import type { FC } from 'react';

import { Container, Item } from './styles';
import type { Props } from './types';

const VerifySteps: FC<Props> = ({ current }) => (
  <Container>
    <Item $isCurrent={current === 'enter-email'}>Introducir email</Item>
    <Item $isCurrent={current === 'sign-verification'}>
      Firmar verificación
    </Item>
    <Item $isCurrent={current === 'publish-identity'}>Publicar identidad</Item>
  </Container>
);

export default memo(VerifySteps);
