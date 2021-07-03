import type { FC } from 'react';

import { Container, Background, Content, Title } from './styles';
import type { Props } from './types';

const Hero: FC<Props> = ({ className, img, imgWebp, title }) => (
  <Container className={className}>
    <picture>
      <source srcSet={imgWebp.srcSet} type="image/webp" />
      <Background
        src={img.src}
        srcSet={img.srcSet}
        height={img.height}
        width={img.width}
      />
    </picture>
    <Content>
      <Title>{title}</Title>
    </Content>
  </Container>
);

export default Hero;
