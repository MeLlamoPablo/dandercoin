import type { Proposal } from '$/api/queries/governance/getProposal';

export default function formatProposalState(input: Proposal['state']): string {
  switch (input) {
    case 'active':
      return 'Activa';
    case 'canceled':
      return 'Cancelada';
    case 'defeated':
      return 'Rechazada';
    case 'executed':
      return 'Ejecutada';
    case 'expired':
      return 'Expirada';
    case 'pending':
      return 'En reflexión';
    case 'queued':
      return 'En cola';
    case 'succeeded':
      return 'Aprobada';
  }
}
