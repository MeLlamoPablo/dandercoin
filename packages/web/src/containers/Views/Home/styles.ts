import styled from 'styled-components';

export const Container = styled.main`
  align-items: center;
  background-color: #fff2e5;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1180px) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem 2rem;
  }

  @media (min-width: 1500px) {
    grid-gap: 5rem 4rem;
  }

  > *:not(:last-child) {
    margin-bottom: 2rem;

    @media (min-width: 1180px) {
      margin-bottom: 0;
    }
  }
`;

export const Logo = styled.img`
  height: 350px;
  width: 350px;

  @media (min-width: 670px) {
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
  }
`;

export const TitleSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 670px) {
    font-size: 5.5rem;
  }

  @media (min-width: 1500px) {
    font-size: 7.5rem;
  }
`;

export const Subtitle = styled.h2`
  color: #000000b0;
  font-size: 2rem;
  margin: 0;

  @media (min-width: 670px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1500px) {
    font-size: 4rem;
  }
`;

export const TeaserSection = styled.div`
  display: flex;
  justify-content: center;
  grid-column: span 2;
`;

export const Teaser = styled.h3`
  color: #000000b0;
  font-size: 1.5rem;
`;
