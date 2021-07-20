import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import Prompt from './Prompt';
import { Container } from './styles';
import type { Props } from './types';

export default function Hashes({
  actionIndex,
  control,
  hash,
  parameterIndex,
  setValue,
}: Props) {
  const value: string =
    useWatch({
      control,
      name: `actions.${actionIndex}.parameters.${parameterIndex}.value` as const,
      defaultValue: undefined,
    }) ?? '';

  const prompts = useMemo(
    () =>
      ((value.match(/keccak256\(\w+\)*/g) as string[] | null) ?? []).map(
        (hash) => /keccak256\((\w+)\)/.exec(hash)?.[1] ?? '',
      ),
    [value],
  );

  if (prompts.length === 0) {
    return null;
  }

  return (
    <Container>
      {prompts.map((prompt) => (
        <Prompt
          actionIndex={actionIndex}
          hash={hash}
          key={prompt}
          parameterIndex={parameterIndex}
          prompt={prompt}
          setValue={setValue}
          value={value}
        />
      ))}
    </Container>
  );
}
