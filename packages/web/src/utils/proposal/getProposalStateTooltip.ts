import type { Proposal } from '$/api/queries/governance/getProposal';

export default function getProposalStateTooltip(
  input: Proposal['state'],
): string {
  switch (input) {
    case 'active':
      return 'Las votaciones están activas. Los votantes deben votar y esperar a que terminen. Para que la propuesta se apruebe, el número de votos a favor debe superar el quórum y los votos en contra.';
    case 'canceled':
      return 'La propuesta ha sido cancelada a petición de quien la propuso.';
    case 'defeated':
      return 'La propuesta no ha conseguido el quórum o ha recibido más votos en contra que a favor y por tanto no se ejecutará.';
    case 'executed':
      return 'La propuesta se ha aprobado y ejecutado correctamente.';
    case 'expired':
      return 'La propuesta lleva en cola demasiado tiempo y ha expirado. Debe proponerse y votarse de nuevo.';
    case 'pending':
      return 'La propuesta se encuentra en jornada de refelxión. Los votantes deben decidir qué opción elegirán. Solo contarán los votos que se deleguen antes de que termine esta jornada. Cuando se abran las votaciones, las nuevas delegaciones o transferencias de DANDER no tendrán efecto.';
    case 'queued':
      return 'La propuesta se ha aprobado, está en cola y se ejecutará pronto.';
    case 'succeeded':
      return 'La propuesta se ha aprobado y debe ponerse en cola para su ejecución.';
  }
}
