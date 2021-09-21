import type { FC } from 'react';

import metamaskLogoWebp from '$/assets/images/metamask-logo.png?sizes[]=160&sizes[]=320&sizes[]=480&format=webp';
import metamaskLogo from '$/assets/images/metamask-logo.png?sizes[]=160&sizes[]=320&sizes[]=480';
import torusLogoWebp from '$/assets/images/torus-logo.png?sizes[]=250&sizes[]=500&sizes[]=750&format=webp';
import torusLogo from '$/assets/images/torus-logo.png?sizes[]=250&sizes[]=500&sizes[]=750';
import { SHOW_WIP } from '$/config';

import useConnect from './connect';
import {
  Container,
  Paragraph,
  Provider,
  ProviderButton,
  ProviderInfo,
  ProviderLogo,
  Providers,
  ProviderTitle,
} from './styles';

const Guest: FC = () => {
  const { handle, hasMetamask } = useConnect();

  return (
    <Container>
      <Paragraph>
        Conecta tu cartera para interactuar con la red de Dandercoin.
      </Paragraph>
      <Providers>
        <Provider>
          {SHOW_WIP && <ProviderTitle>Si eres developer...</ProviderTitle>}
          <ProviderLogo>
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
          </ProviderLogo>
          <ProviderButton onClick={handle.connectMetamask}>
            {hasMetamask ? 'Conectar' : 'Instalar'} Metamask
          </ProviderButton>
          <ProviderInfo>
            Metamask es la wallet de Ethereum más popular. <br />
            <br />
            Solo tú tendrás el control de tus Dander, pero también serás
            responsable de custodiar las claves privadas. <br />
            <br />
            <strong>Si las pierdes, pierdes tus Dander</strong>.
          </ProviderInfo>
        </Provider>
        <Provider>
          {SHOW_WIP ? (
            <>
              <ProviderTitle>Si eres designer...</ProviderTitle>
              <ProviderLogo>
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
              </ProviderLogo>
              <ProviderButton onClick={handle.connectTorus}>
                Conectar Torus
              </ProviderButton>
              <ProviderInfo>
                Torus custodia tus Dander por ti para que no te tengas que
                preocupar de las copias de seguridad. <br />
                <br />
                Es más cómodo, pero dependes de un tercero. <br />
                <br />
                <strong>
                  Elige esta opción si no tienes mucha experiencia con
                  criptomonedas.
                </strong>
              </ProviderInfo>
            </>
          ) : (
            <p>Más wallets Próximamente™...</p>
          )}
        </Provider>
      </Providers>
    </Container>
  );
};

export default Guest;
