import type useProposal from '$/api/hooks/governance/useProposal';

export type Props = {
  proposal: NonNullable<ReturnType<typeof useProposal>['data']>;
};
