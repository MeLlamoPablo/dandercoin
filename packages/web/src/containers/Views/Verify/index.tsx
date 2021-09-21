import Link from 'next/link';
import type { FC } from 'react';

import VerifySteps from '$/components/VerifySteps';

import useConnect from './connect';
import EnterEmail from './EnterEmail';
import PublishIdentity from './PublishIdentity';
import SignVerification from './SignVerification';
import { Container, Content } from './styles';

const AccountView: FC = () => {
  const { account, currentStep } = useConnect();

  return (
    <Container>
      <VerifySteps current={currentStep} />
      <Content>
        {account ? (
          <>
            {currentStep === 'enter-email' && <EnterEmail />}
            {currentStep === 'sign-verification' && <SignVerification />}
            {currentStep === 'publish-identity' && <PublishIdentity />}
          </>
        ) : (
          <>
            Debes conectar tu cartera para verificar tu identidad. Por favor
            dirígete a{' '}
            <Link href="/account" passHref>
              <a>Cuenta</a>
            </Link>
            .
          </>
        )}
      </Content>
    </Container>
  );
};

export default AccountView;
