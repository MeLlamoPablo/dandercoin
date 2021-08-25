import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { memo } from 'react';

import { parseWeiAmount } from '$/utils/formatWeiAmount';

import useConnect from './connect';
import { Container, ProposalState, SmallText, Text, TextArea } from './styles';
import type { Props } from './types';

function ActiveState({ proposal }: Props) {
  const {
    handle,
    hasVoted,
    isLoading,
    quorum,
    remainingMilliseconds,
    voteType,
  } = useConnect({
    proposal,
  });

  return (
    <Container>
      {quorum && typeof remainingMilliseconds !== 'undefined' && (
        <div>
          <Text>
            La jornada de reflexión termina en aproximadamente{' '}
            {formatDistanceToNow(Date.now() + remainingMilliseconds, {
              locale: es,
            })}
            .
          </Text>
          <ul>
            <li>
              Votos a favor: {parseWeiAmount(proposal.forVotes)}{' '}
              <em>(quórum: {parseWeiAmount(quorum)})</em>
            </li>
            <li>Votos en contra: {parseWeiAmount(proposal.againstVotes)}</li>
            <li>Abstenciones: {parseWeiAmount(proposal.abstainVotes)}</li>
          </ul>
          {hasVoted ? (
            <>
              {voteType === 'for' && (
                <p>Has votado a favor de esta propuesta</p>
              )}
              {voteType === 'against' && (
                <p>Has votado en contra de esta propuesta</p>
              )}
              {voteType === 'abstain' && (
                <p>Te has abstenido de esta propuesta</p>
              )}
            </>
          ) : (
            <form onSubmit={handle.vote}>
              <TextArea name="reason" placeholder="Comentario (opcional)" />
              <button data-vote-type="for" disabled={isLoading} type="submit">
                Votar a favor
              </button>
              <button
                data-vote-type="against"
                disabled={isLoading}
                type="submit"
              >
                Votar en contra
              </button>
              <button
                data-vote-type="abstain"
                disabled={isLoading}
                type="submit"
              >
                Abstenerse
              </button>
            </form>
          )}
          <SmallText>
            Esta UI es mejorable, está en mi lista de cosas pendientes :) Le
            quiero meter una gráfica bien guapa, toda ayuda es bienvenida.
          </SmallText>
        </div>
      )}
      <ProposalState state="active" />
    </Container>
  );
}

export default memo(ActiveState);
