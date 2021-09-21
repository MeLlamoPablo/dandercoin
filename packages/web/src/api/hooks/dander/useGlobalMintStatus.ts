import { useMemo } from 'react';
import { useQuery } from 'react-query';

import useIsCorrectNetwork from '$/api/hooks/wallet/useIsCorrectNetwork';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useGetGlobalMintStatusQuery, {
  GET_GLOBAL_MINT_STATUS_KEY,
} from '$/api/queries/dander/getGlobalMintStatus';

export default function useGlobalMintStatus() {
  const { web3 } = useWeb3();

  const { data: raw } = useQuery(GET_GLOBAL_MINT_STATUS_KEY(), {
    enabled: useIsCorrectNetwork() === 'correct',
    queryFn: useGetGlobalMintStatusQuery(),
  });

  const data = useMemo(
    () =>
      raw && web3
        ? {
            remainingMintCapacity: web3.utils.toBN(raw.remainingMintCapacity),
            yearlyMintLimit: web3.utils.toBN(raw.yearlyMintLimit),
          }
        : undefined,
    [raw, web3],
  );

  return { data };
}
