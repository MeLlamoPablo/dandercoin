import Link from 'next/link';
import type { FC } from 'react';
import { FaWallet } from 'react-icons/fa';

import logoWebp from '$/assets/images/logo.png?sizes[]=40&sizes[]=80&sizes[]=120&format=webp';
import logo from '$/assets/images/logo.png?sizes[]=40&sizes[]=80&sizes[]=120';

import {
  Container,
  Content,
  Header,
  Logo,
  Navigation,
  NavLink,
  Title,
} from './styles';
import type { Props } from './types';

const MainLayout: FC<Props> = ({ children, className }) => (
  <Container className={className}>
    <Header>
      <Link href="/" passHref>
        <Logo>
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
          <Title>Dandercoin</Title>
        </Logo>
      </Link>
      <Navigation>
        <Link href="/bank" passHref>
          <NavLink>Bank</NavLink>
        </Link>
        <Link href="/rankings" passHref>
          <NavLink>Rankings</NavLink>
        </Link>
        <Link href="/governance" passHref>
          <NavLink>Gobernanza</NavLink>
        </Link>
        <Link href="/account" passHref>
          <NavLink>
            <FaWallet />
            Cuenta
          </NavLink>
        </Link>
      </Navigation>
    </Header>
    <Content>{children}</Content>
  </Container>
);

export default MainLayout;
