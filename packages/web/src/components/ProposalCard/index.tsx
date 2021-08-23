import Link from 'next/link';
import { memo } from 'react';

import { Container, Number, State, Title } from './styles';
import type { Props } from './types';

function ProposalCard({ id, state, title, url }: Props): JSX.Element {
  return (
    <Container>
      <Link href={`${url}/${id}`} passHref>
        <Title>
          <Number>#{id}</Number> {title}
        </Title>
      </Link>
      <State state={state} />
    </Container>
  );
}

export default memo(ProposalCard);
