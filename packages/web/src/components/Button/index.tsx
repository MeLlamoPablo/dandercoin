import type { FC } from 'react';
import { memo } from 'react';

import { Container } from './styles';
import type { Props } from './types';

const Button: FC<Props> = ({
  children,
  disabled = false,
  className,
  onClick,
}) => (
  <Container className={className} disabled={disabled} onClick={onClick}>
    {children}
  </Container>
);

export default memo(Button) as typeof Button;
