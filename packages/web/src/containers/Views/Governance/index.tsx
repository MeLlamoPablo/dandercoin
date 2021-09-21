import ProposalCard from '$/components/ProposalCard';

import useConnect from './connect';
import Politician from './Politician';
import {
  Container,
  Politicians,
  SelfDelegate,
  SelfDelegateText,
  SelfDelegateButton,
  Title,
} from './styles';
import type { Props } from './types';

function Bank({ politicians }: Props): JSX.Element {
  const { handle, isSelfDelegating, proposals, url } = useConnect();

  return (
    <Container>
      <Title>Últimas propuestas</Title>
      <div>
        {proposals.map((proposal) => (
          <ProposalCard
            id={proposal.id}
            key={proposal.id}
            state={proposal.state}
            title={proposal.title}
            url={url}
          />
        ))}
      </div>
      <Title>Políticos</Title>
      <Politicians>
        {politicians.map((politician) => (
          <Politician key={politician.address} politician={politician} />
        ))}
      </Politicians>
      <SelfDelegate>
        {isSelfDelegating ? (
          <SelfDelegateText>
            Actualmente te estás delegando tus DANDER a tí. Eso significa que
            puedes votar directamente en propuestas, en lugar de que un político
            vote por tí.
          </SelfDelegateText>
        ) : (
          <>
            <SelfDelegateText>
              ¡También puedes delegarte tus DANDER a tí y participar activamente
              en la gobernanza, en lugar de dejar que un político corrupto
              decida por tí!
            </SelfDelegateText>
            <SelfDelegateButton onClick={handle.selfDelegate}>
              Delegarme mis DANDER
            </SelfDelegateButton>
          </>
        )}
      </SelfDelegate>
    </Container>
  );
}

export default Bank;
