import ActiveState from './ActiveState';
import useConnect from './connect';
import PendingState from './PendingState';
import { Container, Title, Description } from './styles';

function ProposalView(): JSX.Element {
  const { proposal } = useConnect();

  if (!proposal) {
    return <Container>Cargando...</Container>;
  }

  return (
    <Container>
      <Title>
        #{proposal.id}: {proposal.title}
      </Title>
      <Description>{proposal.description}</Description>
      {proposal.state === 'pending' && <PendingState proposal={proposal} />}
      {proposal.state === 'active' && <ActiveState proposal={proposal} />}
    </Container>
  );
}

export default ProposalView;
