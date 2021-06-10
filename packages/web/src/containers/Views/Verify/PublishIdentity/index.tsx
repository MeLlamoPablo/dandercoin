import type { FC } from 'react';

import Button from '$/components/Button';

import useConnect from './connect';
import { Paragraph } from './styles';
import Link from 'next/link';

const SignVerification: FC = () => {
  const { handle, isLoading, isSuccess } = useConnect();

  if (isSuccess) {
    return (
      <div>
        <Paragraph>
          <strong>¡Listo!</strong>
        </Paragraph>
        <Paragraph>
          Has vinculado tu identidad correctamente. Si te corresponden DANDER,
          puedes reclamarlos en{' '}
          <Link href="/account" passHref>
            <a>Cuenta</a>
          </Link>
          .
        </Paragraph>
      </div>
    );
  }

  return (
    <div>
      <Paragraph>
        Tu email se ha verificado correctamente y ya puedes publicar tu
        identidad en la blockchain.
      </Paragraph>
      <Button disabled={isLoading} onClick={handle.publishIdentity}>
        {isLoading ? 'Publicando...' : 'Publicar identidad'}
      </Button>
    </div>
  );
};

export default SignVerification;
