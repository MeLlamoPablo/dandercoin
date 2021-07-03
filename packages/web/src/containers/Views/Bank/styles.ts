import styled from 'styled-components';

import MintStatus from '$/components/MintStatus';
import MainLayout from '$/containers/Layouts/Main';
import { Hero, MainParagraph } from '$/containers/Views/Home/styles';

export const Container = styled(MainLayout)``;

export const GlobalStatusContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.silver};
  display: flex;
  margin-top: 4rem;
  padding: 2rem 0;
`;

export const GlobalStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const GlobalStatus = styled(MintStatus)`
  font-size: 2rem;
`;

export const GlobalStatusLabel = styled.span`
  color: ${({ theme }) => theme.colors.black70};
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

export { Hero, MainParagraph };
