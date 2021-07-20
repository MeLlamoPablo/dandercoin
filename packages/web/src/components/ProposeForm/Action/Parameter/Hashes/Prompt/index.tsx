import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { Actions, Container } from './styles';
import type { Props } from './types';

export default function Prompt({
  actionIndex,
  hash,
  parameterIndex,
  prompt,
  setValue,
  value,
}: Props) {
  const [hashInput, setHashInput] = useState('');

  const onHash = useCallback(() => {
    if (!hash) {
      return;
    }

    setValue(
      `actions.${actionIndex}.parameters.${parameterIndex}.value` as const,
      value.replace(`keccak256(${prompt})`, hash(hashInput)) as never,
    );
  }, [actionIndex, hash, hashInput, parameterIndex, prompt, setValue, value]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHashInput(e.target.value ?? '');
    },
    [setHashInput],
  );

  return (
    <Container>
      <label htmlFor={`hash_${prompt}`}>Value of '{prompt}' to be hashed</label>
      <Actions>
        <input
          id={`hash_${prompt}`}
          onChange={onInputChange}
          type="text"
          value={hashInput}
        />
        <button
          disabled={hashInput.length === 0}
          onClick={onHash}
          type="button"
        >
          Hash
        </button>
      </Actions>
    </Container>
  );
}
