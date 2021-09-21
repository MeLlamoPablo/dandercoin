import { useQueries, UseQueryOptions, UseQueryResult } from 'react-query';
import { useMemo } from 'react';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetProposalQuery, {
  GET_PROPOSAL_QUERY_KEY,
  Proposal,
} from '$/api/queries/governance/getProposal';

import useProposalCount from './useProposalCount';
import useProposalDescriptions from './useProposalDescriptions';

const MAX_PROPOSALS_TO_QUERY = 3;

export default function useLatestProposals() {
  const getProposalQuery = useGetProposalQuery();

  const { data: proposalCount = 0 } = useProposalCount();
  const { data: descriptions } = useProposalDescriptions();

  const isCorrectNetwork = useIsCorrectNetwork() === 'correct';
  const proposalsToQuery = useMemo(() => {
    if (!isCorrectNetwork) {
      return [];
    }

    return Array(MAX_PROPOSALS_TO_QUERY)
      .fill(null)
      .map((_, i) => proposalCount - i)
      .filter((id) => id > 0);
  }, [isCorrectNetwork, proposalCount]);

  const results = useQueries(
    useMemo(
      (): UseQueryOptions<any, any, any, any>[] =>
        proposalsToQuery.map((proposalId) => ({
          queryKey: GET_PROPOSAL_QUERY_KEY({ proposalId }),
          queryFn: getProposalQuery,
        })),
      [proposalsToQuery],
    ),
  ) as UseQueryResult<Proposal | undefined>[];

  const data = useMemo(
    () =>
      results.flatMap((result) => {
        if (!result.data) {
          return [];
        }

        return [
          {
            description: descriptions?.[result.data.id]?.description ?? '',
            id: result.data.id,
            state: result.data.state,
            title: descriptions?.[result.data.id]?.title ?? '',
          },
        ];
      }),
    [descriptions, results],
  );

  return { data };
}
