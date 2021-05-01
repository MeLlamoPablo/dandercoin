import type { FC } from 'react';

import logoWebp from '$/assets/images/logo.png?sizes[]=500&sizes[]=750&sizes[]=1181&format=webp';
import logo from '$/assets/images/logo.png?sizes[]=500&sizes[]=750&sizes[]=1181';

import {
  Container,
  Content,
  Logo,
  Subtitle,
  Teaser,
  TeaserSection,
  Title,
  TitleSection,
} from './styles';

const HomeView: FC = () => (
  <Container>
    <Content>
      <picture>
        <source srcSet={logoWebp.srcSet} type="image/webp" />
        <Logo
          src={logo.src}
          srcSet={logo.srcSet}
          alt="Dandercoin"
          height={logo.height}
          width={logo.width}
        />
      </picture>
      <TitleSection>
        <Title>Dandercoin</Title>
        <Subtitle>La moneda del pueblo</Subtitle>
      </TitleSection>
      <TeaserSection>
        <Teaser>Coming Soon™</Teaser>
      </TeaserSection>
    </Content>
  </Container>
);

export default HomeView;
