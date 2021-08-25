import {useMemo} from "react";
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetQuorumQuery, {
  GET_QUORUM_QUERY_KEY,
} from '$/api/queries/governance/getQuorum';

export default function useQuorum() {
  const { web3 } = useWeb3();
  const { data: rawQuorum } = useQuery(GET_QUORUM_QUERY_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetQuorumQuery(),
  });

  const data = useMemo(() => rawQuorum && web3?.utils.toBN(rawQuorum), [
    rawQuorum,
    web3,
  ]);

  return { data };
}
