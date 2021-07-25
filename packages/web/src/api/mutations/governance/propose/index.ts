import { useCallback } from 'react';
import type { MutationFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

import type { ProposeResponse, ProposeVariables } from './types';

export default function useProposeMutation(): MutationFunction<
  ProposeResponse,
  ProposeVariables
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(
    async ({ actions, description, from }) => {
      const Governor = await getGovernorContract();

      await Governor?.methods
        .propose(
          actions.map(({ target }) => target),
          actions.map(({ value }) => value),
          actions.map(({ signature }) => signature),
          actions.map(({ callData }) => callData),
          description,
        )
        .send({ from });
    },
    [getGovernorContract],
  );
}
