import type { FC } from 'react';

import heroWebp from '$/assets/images/danderbank.png?sizes[]=880&sizes[]=1760&sizes[]=2640&format=webp';
import hero from '$/assets/images/danderbank.png?sizes[]=880&sizes[]=1760&sizes[]=2640';

import useConnect from './connect';
import {
  Container,
  GlobalStatus,
  GlobalStatusContainer,
  GlobalStatusContent,
  GlobalStatusLabel,
  Hero,
  MainParagraph,
} from './styles';

const Bank: FC = () => {
  const { globalMintStatus } = useConnect();

  return (
    <Container>
      <Hero img={hero} imgWebp={heroWebp} title="DanderBank" />
      <MainParagraph>
        Al contrario que Bitcoin, Dandercoin es una moneda inflacionaria. Las
        emisiones de nuevos DANDER se gestionan en el DanderBank.
      </MainParagraph>
      {globalMintStatus && (
        <GlobalStatusContainer>
          <GlobalStatusContent>
            <GlobalStatus
              remainingMintCapacity={globalMintStatus.remainingMintCapacity}
              yearlyMintLimit={globalMintStatus.yearlyMintLimit}
            />
            <GlobalStatusLabel>Límite global del protocolo</GlobalStatusLabel>
          </GlobalStatusContent>
        </GlobalStatusContainer>
      )}
    </Container>
  );
};

export default Bank;
