import type { FC } from 'react';

import heroWebp from '$/assets/images/la-liberte-guidant-le-peuple.png?sizes[]=880&sizes[]=1760&sizes[]=2640&format=webp';
import hero from '$/assets/images/la-liberte-guidant-le-peuple.png?sizes[]=880&sizes[]=1760&sizes[]=2640';

import { Container, Hero, MainParagraph } from './styles';

const HomeView: FC = () => (
  <Container>
    <Hero img={hero} imgWebp={heroWebp} title="La moneda del pueblo" />
    <MainParagraph>
      Dandercoin es una criptomoneda transparente, segura, y escalable creada{' '}
      por y para el pueblo, desplegada en la red{' '}
      <a
        href="https://polygon.technology/"
        rel="noreferrer noopeneer"
        target="_blank"
      >
        Polygon
      </a>
      .
    </MainParagraph>
  </Container>
);

export default HomeView;
