import { useCallback, useMemo } from 'react';
import type { UseFieldArrayReturn } from 'react-hook-form/dist/types/fieldArray';

import type { Action, FormModel } from './types';

type Preset = Readonly<{
  name: string;
  value: ReadonlyArray<Partial<Action>>;
}>;

const presets: readonly Preset[] = [
  {
    name: 'Modificar Timelock',
    value: [
      {
        functionName: 'setDelay',
        parameters: [
          {
            type: 'uint256',
            value: '(delay in seconds)',
          },
        ],
        target: process.env.NEXT_PUBLIC_TIMELOCK_CONTRACT_ADDRESS,
      },
    ],
  },
  {
    name: 'Modificar Governor',
    value: [
      {
        functionName: '_setVotingDelay',
        parameters: [
          {
            type: 'uint256',
            value: '(delay in blocks)',
          },
        ],
        target: process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS,
      },
    ],
  },
  {
    name: 'Mintear',
    value: [
      {
        functionName: 'mint',
        parameters: [
          {
            type: 'address',
            value: '(address of mint recipient)',
          },
          {
            type: 'uint256',
            value: '(mint amount in wei)',
          },
        ],
        target: process.env.NEXT_PUBLIC_DANDERCOIN_CONTRACT_ADDRESS,
      },
    ],
  },
  // TODO this doesn't actually work
  //   The tokens get minted but Timelock doesn't actually approve the tokens
  //   to Distributor, nor does it send them.
  {
    name: 'Mintear + distribuir',
    value: [
      {
        functionName: 'mint',
        parameters: [
          {
            type: 'address',
            value: process.env.NEXT_PUBLIC_TIMELOCK_CONTRACT_ADDRESS ?? '',
          },
          {
            type: 'uint256',
            value: '(mint amount in wei)',
          },
        ],
        target: process.env.NEXT_PUBLIC_DANDERCOIN_CONTRACT_ADDRESS,
      },
      {
        functionName: 'increaseAllowance',
        parameters: [
          {
            type: 'address',
            value: process.env.NEXT_PUBLIC_DISTRIBUTOR_CONTRACT_ADDRESS ?? '',
          },
          {
            type: 'uint256',
            value: '(mint amount in wei)',
          },
        ],
        target: process.env.NEXT_PUBLIC_DANDERCOIN_CONTRACT_ADDRESS,
      },
      {
        functionName: 'grant',
        parameters: [
          {
            type: 'tuple(uint256,bytes32)[]',
            value: '[["(mint amount in wei)", "keccak256(email)"]]',
          },
        ],
        target: process.env.NEXT_PUBLIC_DISTRIBUTOR_CONTRACT_ADDRESS,
      },
    ],
  },
];

export function useAddAction({
  append,
}: {
  append: UseFieldArrayReturn<FormModel, 'actions'>['append'];
}) {
  const addBlank = useCallback(() => {
    append({});
  }, [append]);

  const addPresets = useMemo(
    () =>
      presets.map((preset) => ({
        add: () => {
          append([...preset.value]);
        },
        name: preset.name,
      })),
    [append],
  );

  return { addBlank, addPresets };
}
