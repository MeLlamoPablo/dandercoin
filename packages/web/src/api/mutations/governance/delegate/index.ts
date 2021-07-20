import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import useGetDandercoinContract from '$/api/hooks/contracts/useGetDandercoinContract';

import type { DelegateResponse, DelegateVariables } from './types';

export default function useDelegateMutation(): MutationFunction<
  DelegateResponse,
  DelegateVariables
> {
  const getDandercoinContract = useGetDandercoinContract();

  return useCallback(
    async ({ from, to }) => {
      const Dandercoin = await getDandercoinContract();
      await Dandercoin?.methods.delegate(to).send({ from });
    },
    [getDandercoinContract],
  );
}
