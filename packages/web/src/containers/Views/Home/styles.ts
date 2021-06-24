import styled from 'styled-components';
import DefaultHero from '$/components/Hero';
import MainLayout from '$/containers/Layouts/Main';

export const Container = styled(MainLayout)``;

export const Hero = styled(DefaultHero)`
  margin-bottom: 4rem;
`;

export const MainParagraph = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;
