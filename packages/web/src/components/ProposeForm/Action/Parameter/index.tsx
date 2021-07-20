import { useCallback } from 'react';

import AddressInfo from './AddressInfo';
import Hashes from './Hashes';
import { Container, InputGroup, Label, ValueContainer } from './styles';
import type { Props } from './types';

export default function Parameter({
  actionIndex,
  control,
  hash,
  index,
  field,
  register,
  remove,
  setValue,
}: Props) {
  const handleRemoveSelf = useCallback(() => {
    remove(index);
  }, [index, remove]);

  return (
    <Container>
      <InputGroup>
        <Label>Tipo</Label>
        <input
          defaultValue={field.type}
          type="text"
          {...register(
            `actions.${actionIndex}.parameters.${index}.type` as const,
          )}
        />
      </InputGroup>
      <InputGroup>
        <Label>Valor</Label>
        <ValueContainer>
          <input
            defaultValue={field.value}
            type="text"
            {...register(
              `actions.${actionIndex}.parameters.${index}.value` as const,
            )}
          />
          <AddressInfo
            actionIndex={actionIndex}
            control={control}
            parameterIndex={index}
          />
          <Hashes
            actionIndex={actionIndex}
            control={control}
            hash={hash}
            parameterIndex={index}
            setValue={setValue}
          />
        </ValueContainer>
      </InputGroup>
      <button onClick={handleRemoveSelf} type="button">
        -
      </button>
    </Container>
  );
}
