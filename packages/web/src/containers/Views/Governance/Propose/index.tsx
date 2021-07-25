import type { FC } from 'react';

import ProposeForm from '$/components/ProposeForm';

import useConnect from './connect';
import { Container } from './styles';

const Bank: FC = () => {
  const { canPropose, handle, hash } = useConnect();

  return (
    <Container>
      <h1>Abrir propuesta</h1>
      {canPropose === 'no' && (
        <p>
          No tienes suficientes DANDER delegados como para abrir una propuesta.
          ¿Te has delegado tus propios dander a tí mismo?
        </p>
      )}
      {canPropose === 'yes' && (
        <ProposeForm hash={hash} onSubmit={handle.submit} />
      )}
    </Container>
  );
};

export default Bank;
