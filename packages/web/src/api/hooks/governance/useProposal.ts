import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetProposalQuery, {
  GET_PROPOSAL_QUERY_KEY,
} from '$/api/queries/governance/getProposal';

import useProposalDescriptions from './useProposalDescriptions';

export default function useProposal({ proposalId }: { proposalId: string }) {
  const { web3 } = useWeb3();
  const { data: descriptions } = useProposalDescriptions();

  const { error, data } = useQuery(
    GET_PROPOSAL_QUERY_KEY({ proposalId: +proposalId }),
    {
      enabled: useIsCorrectNetwork() === 'correct',
      queryFn: useGetProposalQuery(),
    },
  );

  const normalized = useMemo(() => {
    if (!data || !web3) {
      return undefined;
    }

    return {
      abstainVotes: web3.utils.toBN(data.abstainVotes),
      againstVotes: web3.utils.toBN(data.againstVotes),
      description: descriptions?.[data.id]?.description ?? '',
      endBlock: data.endBlock,
      forVotes: web3.utils.toBN(data.forVotes),
      id: data.id,
      startBlock: data.startBlock,
      state: data.state,
      title: descriptions?.[data.id]?.title ?? '',
    };
  }, [data, descriptions, web3]);

  return { data: normalized, isNotFound: error === 'not-found' };
}
