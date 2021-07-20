import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';

import type { FormModel } from '../types';
import ContractInfo from './ContractInfo';
import Parameter from './Parameter';
import { Container, FormActions, InputGroup, Label } from './styles';
import type { Props } from './types';

export default function Action({
  control,
  hash,
  index,
  field,
  register,
  remove,
  setValue,
}: Props) {
  const {
    append,
    fields: parameters,
    remove: removeParameter,
  } = useFieldArray<FormModel>({
    control,
    name: `actions.${index}.parameters` as const,
  });

  const handleAddParameter = useCallback(() => {
    append({});
  }, [append]);

  const handleRemoveSelf = useCallback(() => {
    remove(index);
  }, [index, remove]);

  return (
    <Container>
      <InputGroup>
        <Label>Contrato a llamar</Label>
        <input
          defaultValue={field.target}
          type="text"
          {...register(`actions.${index}.target` as const)}
        />
        <ContractInfo control={control} index={index} />
      </InputGroup>
      <InputGroup>
        <Label>Nombre de la función</Label>
        <input
          defaultValue={field.functionName}
          type="text"
          {...register(`actions.${index}.functionName` as const)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Parámetros</Label>
        <div>
          {parameters.map((parameter, parameterIndex) => (
            <Parameter
              actionIndex={index}
              control={control}
              hash={hash}
              index={parameterIndex}
              field={parameter}
              key={parameter.id}
              remove={removeParameter}
              register={register}
              setValue={setValue}
            />
          ))}
        </div>
      </InputGroup>
      <FormActions>
        <button onClick={handleAddParameter} type="button">
          + Añadir parámetro
        </button>
        <button onClick={handleRemoveSelf} type="button">
          - Eliminar acción
        </button>
      </FormActions>
    </Container>
  );
}
