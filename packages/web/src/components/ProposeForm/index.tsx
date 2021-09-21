import { useFieldArray, useForm } from 'react-hook-form';

import Action from './Action';
import { useAddAction } from './logic';
import { Container, FormActions, InputGroup, Label } from './styles';
import type { FormModel, Props } from './types';

export default function ProposeForm({ hash, onSubmit }: Props) {
  const { control, handleSubmit, register, setValue } = useForm<FormModel>();
  const { fields: actions, append, remove } = useFieldArray({
    control,
    name: 'actions',
  });

  const { addBlank, addPresets } = useAddAction({ append });

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label htmlFor="title">Título</Label>
        <input id="title" {...register('title')} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="description">Descripción</Label>
        <textarea id="description" {...register('description')} />
      </InputGroup>
      <InputGroup>
        <Label>Acciones</Label>
        {actions.map((action, index) => (
          <Action
            control={control}
            hash={hash}
            index={index}
            key={action.id}
            field={action}
            register={register}
            remove={remove}
            setValue={setValue}
          />
        ))}
      </InputGroup>
      <FormActions>
        <button onClick={addBlank} type="button">
          + Nueva acción vacía
        </button>
        {addPresets.map((preset) => (
          <button key={preset.name} onClick={preset.add} type="button">
            + Acción desde plantilla: {preset.name}
          </button>
        ))}
        <br />
        <br />
        <br />
        <button type="submit">Enviar propuesta</button>
      </FormActions>
    </Container>
  );
}
