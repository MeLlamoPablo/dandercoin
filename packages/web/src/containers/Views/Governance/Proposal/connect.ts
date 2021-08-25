import { useRouter } from 'next/router';

import useProposal from '$/api/hooks/governance/useProposal';

import useNotFoundHandler from './logic';

export default function useConnect() {
  const {
    query: { proposalId },
  } = useRouter();

  const { data: proposal, isNotFound } = useProposal({
    proposalId: typeof proposalId === 'string' ? proposalId : '',
  });
  useNotFoundHandler(isNotFound);

  return {
    proposal,
  };
}
