import type { FC } from 'react';

import { Container, Hero, MainParagraph } from './styles';

const HomeView: FC = () => (
  <Container>
    <Hero />
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
