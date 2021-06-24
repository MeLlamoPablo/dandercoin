import type { FC } from 'react';

import bgWebp from '$/assets/images/la-liberte-guidant-le-peuple.png?sizes[]=880&sizes[]=1760&sizes[]=2640&format=webp';
import bg from '$/assets/images/la-liberte-guidant-le-peuple.png?sizes[]=880&sizes[]=1760&sizes[]=2640';

import { Container, Background, Content, Title } from './styles';
import type { Props } from './types';

const Hero: FC<Props> = ({ className }) => (
  <Container className={className}>
    <picture>
      <source srcSet={bgWebp.srcSet} type="image/webp" />
      <Background
        src={bg.src}
        srcSet={bg.srcSet}
        height={bg.height}
        width={bg.width}
      />
    </picture>
    <Content>
      <Title>La moneda del pueblo</Title>
    </Content>
  </Container>
);

export default Hero;
