import { useCallback } from 'react';
import { useMutation } from 'react-query';

import useWallet from '$/api/hooks/wallet/useWallet';
import useWeb3 from '$/api/hooks/wallet/useWeb3';
import useDelegateMutation from '$/api/mutations/governance/delegate';
import useProposeMutation from '$/api/mutations/governance/propose';

export default function useGovernanceActions() {
  const { data: { account } = {} } = useWallet();
  const { web3 } = useWeb3();

  const {
    isLoading: isDelegateLoading,
    isSuccess: isDelegateSuccess,
    mutate: performDelegate,
  } = useMutation(useDelegateMutation());

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
