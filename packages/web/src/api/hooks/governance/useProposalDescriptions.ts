import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetProposalDescriptionsQuery, {
  GET_PROPOSAL_DESCRIPTIONS_QUERY_KEY,
} from '$/api/queries/governance/getProposalDescriptions';

export default function useProposalDescriptions() {
  const { data } = useQuery(GET_PROPOSAL_DESCRIPTIONS_QUERY_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetProposalDescriptionsQuery(),
  });

  return { data };
}
