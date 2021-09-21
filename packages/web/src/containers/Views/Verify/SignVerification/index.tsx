import type { FC } from 'react';

import Button from '$/components/Button';

import useConnect from './connect';
import { Paragraph } from './styles';

const SignVerification: FC = () => {
  const { isLoading, handle } = useConnect();

  return (
    <div>
      <Paragraph>
        Para vincular tu correo con tu cartera, tienes que firmar un mensaje,
        demostrando así tu propiedad sobre la misma.
      </Paragraph>
      <Button disabled={isLoading} onClick={handle.signVerificationToken}>
        {isLoading ? 'Firmando...' : 'Firmar'}
      </Button>
    </div>
  );
};

export default SignVerification;
