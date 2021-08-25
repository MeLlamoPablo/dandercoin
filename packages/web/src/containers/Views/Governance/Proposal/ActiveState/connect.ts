import useCurrentBlock from '$/api/hooks/ethereum/useCurrentBlock';

import type { Props } from './types';
import useQuorum from '../../../../../api/hooks/governance/useQuorum';
import { useVoteHandler } from './logic';
import useVoteReceipt from '../../../../../api/hooks/governance/useVoteReceipt';
import useWallet from '../../../../../api/hooks/wallet/useWallet';

const BLOCK_TIME_MILLISECONDS = +(
  process.env.NEXT_PUBLIC_ETHEREUM_BLOCK_TIME_MILLISECONDS ?? 0
);

export default function useConnect({
  proposal,
}: {
  proposal: Props['proposal'];
}) {
  const { data: { account } = {} } = useWallet();

  const { data: quorum } = useQuorum();
  const { data: receipt } = useVoteReceipt({
    account,
    proposalId: proposal.id,
  });

  const block = useCurrentBlock();
  const remainingBlocks = block
    ? Math.max(proposal.endBlock - block, 0)
    : undefined;
  const remainingMilliseconds = remainingBlocks
    ? remainingBlocks * BLOCK_TIME_MILLISECONDS
    : undefined;

  const { isLoading, onVote } = useVoteHandler({ proposalId: proposal.id });

  return {
    handle: { vote: onVote },
    hasVoted: !!receipt?.hasVoted,
    isLoading,
    quorum,
    remainingMilliseconds,
    voteType: receipt?.type,
  };
}
