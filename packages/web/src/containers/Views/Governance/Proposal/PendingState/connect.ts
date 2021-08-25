import useCurrentBlock from '$/api/hooks/ethereum/useCurrentBlock';

import type { Props } from './types';

const BLOCK_TIME_MILLISECONDS = +(
  process.env.NEXT_PUBLIC_ETHEREUM_BLOCK_TIME_MILLISECONDS ?? 0
);

export default function useConnect({
  proposal,
}: {
  proposal: Props['proposal'];
}) {
  const block = useCurrentBlock();
  const remainingBlocks = block
    ? Math.max(proposal.startBlock - block, 0)
    : undefined;
  const remainingMilliseconds = remainingBlocks
    ? remainingBlocks * BLOCK_TIME_MILLISECONDS
    : undefined;

  return {
    remainingMilliseconds,
  };
}
