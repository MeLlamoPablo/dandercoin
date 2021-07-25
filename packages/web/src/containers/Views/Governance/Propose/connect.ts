import useWallet from '$/api/hooks/wallet/useWallet';
import useWeb3 from '$/api/hooks/wallet/useWeb3';

import { useCanPropose, useSubmitHandler } from './logic';
import { useCallback } from 'react';

export default function useConnect() {
  const { data } = useWallet();
  const { web3 } = useWeb3();
  const activeAccount = data?.account;

  const canPropose = useCanPropose({ activeAccount });
  const onSubmit = useSubmitHandler();

  const hash = useCallback(
    (input: string): string => web3?.utils?.keccak256(input) ?? '',
    [],
  );

  return { canPropose, handle: { submit: onSubmit }, hash };
}
