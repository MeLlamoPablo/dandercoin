import type { Props } from './types';
import useDanderBalance from '$/api/hooks/dander/useDanderBalance';

export default function useConnect({ address }: { address: Props['address'] }) {
  const { data: balance } = useDanderBalance({ account: address });

  return { balance };
}
