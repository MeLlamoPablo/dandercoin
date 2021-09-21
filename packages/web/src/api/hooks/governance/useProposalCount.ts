import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetProposalCountQuery, {
  GET_PROPOSAL_COUNT_QUERY_KEY,
} from '$/api/queries/governance/getProposalCount';

export default function useProposalCount() {
  const { data: rawCount } = useQuery(GET_PROPOSAL_COUNT_QUERY_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetProposalCountQuery(),
  });

  const data = rawCount
    ? // Subtracting 1 because the first proposal is empty
      Math.max(+rawCount - 1, 0)
    : undefined;

  return { data };
}
