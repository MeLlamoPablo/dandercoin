import styled from 'styled-components';

export const Container = styled.div`
  background-color: #ffffff;
  box-sizing: content-box;
  padding: 2rem 1rem;
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver}64;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const Logo = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.comicSans};
  margin: 0 1rem;
`;

export const Navigation = styled.nav`
  height: fit-content;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Content = styled.main`
  margin: 2rem auto 0;
  max-width: 55rem;
`;
