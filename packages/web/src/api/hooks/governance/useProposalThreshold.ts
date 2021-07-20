import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetProposalThresholdQuery, {
  GET_PROPOSAL_THRESHOLD_QUERY_KEY,
} from '$/api/queries/governance/getProposalThreshold';

export default function useProposalThreshold() {
  const { web3 } = useWeb3();

  const { data: rawThreshold } = useQuery(GET_PROPOSAL_THRESHOLD_QUERY_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetProposalThresholdQuery(),
  });

  const data = useMemo(
    () => (rawThreshold ? web3?.utils.toBN(rawThreshold) : undefined),
    [rawThreshold, web3],
  );

  return { data };
}
