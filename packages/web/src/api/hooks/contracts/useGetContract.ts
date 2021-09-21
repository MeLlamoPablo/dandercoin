import { useCallback } from 'react';
import type { AbiItem } from 'web3-utils';

import useWeb3 from '$/api/hooks/wallet/useWeb3';

export default function useGetContract({
  abi,
  address,
}: {
  abi: AbiItem | AbiItem[];
  address: string;
}) {
  const { getWeb3 } = useWeb3();

  return useCallback(async () => {
    const web3 = await getWeb3();

    if (!web3) {
      return undefined;
    }

    return new web3.eth.Contract(abi, address);
  }, [abi, address, getWeb3]);
}
