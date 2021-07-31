import { memo } from 'react';

import formatProposalState from '$/utils/proposal/formatProposalState';
import getProposalStateTooltip from '$/utils/proposal/getProposalStateTooltip';

import { Container, Icon, Label, Tooltip } from './styles';
import type { Props } from './types';

function ProposalState({ className, state }: Props): JSX.Element {
  const tooltip = getProposalStateTooltip(state);

  return (
    <Tooltip arrow aria-label={tooltip} interactive title={tooltip}>
      <Container className={className} $state={state}>
        <Icon state={state} />
        <Label>{formatProposalState(state)}</Label>
      </Container>
    </Tooltip>
  );
}

export default memo(ProposalState);
