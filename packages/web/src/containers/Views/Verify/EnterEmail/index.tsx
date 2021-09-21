import type { FC } from 'react';

import useConnect from './connect';
import { Paragraph, Form, Row, Warning } from './styles';

const EnterEmail: FC = () => {
  const {
    email,
    isLoading,
    isSendVerificationEmailSuccess,
    handle,
  } = useConnect();

  return (
    <div>
      <Paragraph>
        Verificar tu identidad en la red blockchain consiste en asociar de forma
        pública tu cartera con tu email.
      </Paragraph>
      <Paragraph>
        Más tarde podrás cambiar de email o de cartera, pero al publicarse en la
        blockchain, <strong>esta acción es irreversible</strong>.
      </Paragraph>
      <Paragraph>
        Si te corresponden DANDER por formar parte de la plantilla de Z1, podrás
        reclamarlos después de verificar tu identidad. También apareceras en el
        ranking de Danderholders.
      </Paragraph>
      <Paragraph>
        <strong>
          Los dander de empleado solo se otorgan a la direcciones de correo de
          z1.digital
        </strong>
        .
      </Paragraph>
      <Form onSubmit={handle.submit}>
        <label htmlFor="email">Introduce tu email</label>
        <Row>
          <input
            id="email"
            name="email"
            placeholder="dander@z1.digital"
            type="email"
          />
          <button
            disabled={isLoading || isSendVerificationEmailSuccess}
            type="submit"
          >
            {(() => {
              if (isLoading) {
                return 'Enviando...';
              }

              if (isSendVerificationEmailSuccess) {
                return 'Enviado!';
              }

              return 'Enviar';
            })()}
          </button>
        </Row>
      </Form>
      {email && (
        <Warning>
          Ojo! Tu cuenta ya está vinculada al el email {email}. Si vinculas otro
          sobreescribirás el antiguo.
        </Warning>
      )}
    </div>
  );
};

export default EnterEmail;
