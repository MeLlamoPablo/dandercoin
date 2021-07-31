import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import useWallet from '$/api/hooks/wallet/useWallet';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import { GET_DANDER_DELEGATE_QUERY_KEY } from '$/api/queries/dander/getDanderDelegate';
import { GET_VOTES_QUERY_KEY } from '$/api/queries/dander/getVotes';
import useDelegateMutation from '$/api/mutations/governance/delegate';
import useProposeMutation from '$/api/mutations/governance/propose';

export default function useGovernanceActions() {
  const client = useQueryClient();
  const { data: { account } = {} } = useWallet();
  const { web3 } = useWeb3();

  const {
    isLoading: isDelegateLoading,
    isSuccess: isDelegateSuccess,
    mutate: performDelegate,
  } = useMutation(useDelegateMutation(), {
    onSettled: async (_, __, variables) => {
      await Promise.all([
        client.invalidateQueries(
          GET_DANDER_DELEGATE_QUERY_KEY({ account: variables.from }),
        ),
        client.invalidateQueries(
          GET_VOTES_QUERY_KEY({ account: variables.to }),
        ),
      ]);
    },
  });

  const delegate = useCallback(
    (to: string) => {
      if (!account) {
        return;
      }

      performDelegate({ from: account, to });
    },
    [account, performDelegate],
  );

  const {
    isLoading: isProposeLoading,
    isSuccess: isProposeSuccess,
    mutate: performPropose,
  } = useMutation(useProposeMutation());

  const propose = useCallback(
    ({
      actions,
      description,
    }: {
      actions: ReadonlyArray<{
        functionName: string;
        parameters: ReadonlyArray<{
          type: string;
          value: string;
        }>;
        target: string;
      }>;
      description: string;
    }) => {
      if (!account || !web3) {
        return;
      }

      performPropose({
        actions: actions.map((action) => {
          const parameters = action.parameters.map(({ type, value }) => {
            if (type.includes('tuple') || type.slice(-2) === '[]') {
              return {
                type,
                value: JSON.parse(value),
              };
            }

            return { type, value };
          });

          return {
            callData: web3.eth.abi.encodeParameters(
              parameters.map((parameter) => parameter.type),
              parameters.map((parameter) => parameter.value),
            ),
            signature: `${action.functionName}(${action.parameters
              .map((parameter) => parameter.type)
              .join(',')})`,
            target: action.target,
            value: 0,
          };
        }),
        description,
        from: account,
      });
    },
    [account, performPropose, web3],
  );

  return {
    delegate,
    isLoading: isDelegateLoading || isProposeLoading,
    isSuccess: isDelegateSuccess || isProposeSuccess,
    propose,
  };
}
