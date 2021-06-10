import type { FC } from 'react';

import logoWebp from '$/assets/images/logo.png?sizes[]=40&sizes[]=80&sizes[]=120&format=webp';
import logo from '$/assets/images/logo.png?sizes[]=40&sizes[]=80&sizes[]=120';
import metamaskLogo from '$/assets/images/metamask-logo-white.png?sizes[]=150&sizes[]=300&sizes[]=450';
import metamaskLogoWebp from '$/assets/images/metamask-logo-white.png?sizes[]=150&sizes[]=300&sizes[]=450&format=webp';
import torusLogo from '$/assets/images/torus-logo-white.png?sizes[]=150&sizes[]=300&sizes[]=450';
import torusLogoWebp from '$/assets/images/torus-logo-white.png?sizes[]=150&sizes[]=300&sizes[]=450&format=webp';
import { formatWeiAmount } from '$/utils/formatWeiAmount';

import Claim from './Claim';
import useConnect from './connect';
import {
  Balance,
  BalanceText,
  Container,
  DangerButton,
  DataName,
  DataValue,
  Info,
  MetamaskButton,
  MetamaskHeader,
  MetamaskProvider,
  ProviderContent,
  Section,
  Sidebar,
  TorusButton,
  TorusHeader,
  TorusProvider,
} from './styles';
import Link from 'next/link';

const LoggedIn: FC = () => {
  const {
    account,
    balance,
    email,
    emailLoading,
    handle,
    provider,
  } = useConnect();

  return (
    <Container>
      {balance && (
        <Balance>
          <picture>
            <source srcSet={logoWebp.srcSet} type="image/webp" />
            <img
              src={logo.src}
              srcSet={logo.srcSet}
              alt="Dandercoin"
              height={logo.height}
              width={logo.width}
            />
          </picture>
          <BalanceText>Balance: {formatWeiAmount(balance)}</BalanceText>
        </Balance>
      )}
      <Claim account={account} />
      <Info>
        <Section>
          <DataName>Dirección</DataName>
          <DataValue>{account}</DataValue>
        </Section>
        {!emailLoading && (
          <Section>
            <DataName>Email vinculado</DataName>
            <DataValue>
              {email ? (
                <>
                  {email} (
                  <Link href="/verify" passHref>
                    <a>Modificar</a>
                  </Link>
                  )
                </>
              ) : (
                <>
                  Aún no has vinculado ningún email.
                  <br />
                  <br />
                  Haz{' '}
                  <Link href="/verify" passHref>
                    <a>click aquí</a>
                  </Link>{' '}
                  para vincularlo. Así, podrás reclamar los DANDER que te
                  correspondan.
                </>
              )}
            </DataValue>
          </Section>
        )}
      </Info>
      <Sidebar>
        {provider === 'metamask' && (
          <MetamaskProvider>
            <MetamaskHeader>
              <picture>
                <source srcSet={metamaskLogoWebp.srcSet} type="image/webp" />
                <img
                  src={metamaskLogo.src}
                  srcSet={metamaskLogo.srcSet}
                  alt="Dandercoin"
                  height={metamaskLogo.height}
                  width={metamaskLogo.width}
                />
              </picture>
            </MetamaskHeader>
            <ProviderContent>
              <MetamaskButton onClick={handle.setupMetamaskToken}>
                Añadir token
              </MetamaskButton>
              <DangerButton onClick={handle.logOutMetamask}>
                Desconectar
              </DangerButton>
            </ProviderContent>
          </MetamaskProvider>
        )}
        {provider === 'torus' && (
          <TorusProvider>
            <TorusHeader>
              <picture>
                <source srcSet={torusLogoWebp.srcSet} type="image/webp" />
                <img
                  src={torusLogo.src}
                  srcSet={torusLogo.srcSet}
                  alt="Dandercoin"
                  height={torusLogo.height}
                  width={torusLogo.width}
                />
              </picture>
            </TorusHeader>
            <ProviderContent>
              <TorusButton onClick={handle.openTorusWallet}>
                Abrir cartera
              </TorusButton>
              <DangerButton onClick={handle.logOutTorus}>
                Desconectar
              </DangerButton>
            </ProviderContent>
          </TorusProvider>
        )}
      </Sidebar>
    </Container>
  );
};

export default LoggedIn;
