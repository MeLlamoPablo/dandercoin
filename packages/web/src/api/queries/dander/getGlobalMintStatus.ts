import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetDandercoinContract from '$/api/hooks/contracts/useGetDandercoinContract';

export const GET_GLOBAL_MINT_STATUS_KEY = () => ['dander/getGlobalMintStatus'];

export default function useGetGlobalMintStatusQuery(): QueryFunction<{
  remainingMintCapacity: string;
  yearlyMintLimit: string;
}> {
  const getDandercoin = useGetDandercoinContract();

  return useCallback(async () => {
    const Dandercoin = await getDandercoin();

    const [
      remainingGlobalMintCapacity,
      yearlyGlobalMintLimit,
    ] = await Promise.all([
      Dandercoin?.methods.remainingGlobalMintCapacity().call(),
      Dandercoin?.methods.yearlyGlobalMintLimit().call(),
    ]);

    return {
      remainingMintCapacity: remainingGlobalMintCapacity ?? '0',
      yearlyMintLimit: yearlyGlobalMintLimit ?? '0',
    };
  }, [getDandercoin]);
}
