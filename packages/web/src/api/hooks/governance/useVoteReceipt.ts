import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useGetVoteReceiptQuery, {
  GET_VOTE_RECEIPT_QUERY_KEY,
} from '$/api/queries/governance/getVoteReceipt';

export default function useVoteReceipt({
  account,
  proposalId,
}: {
  account?: string;
  proposalId: number;
}) {
  const { data } = useQuery(
    GET_VOTE_RECEIPT_QUERY_KEY({
      account: account ?? '',
      proposalId,
    }),
    {
      enabled: useIsCorrectNetwork() === 'correct' && !!account,
      queryFn: useGetVoteReceiptQuery(),
    },
  );

  return { data };
}
