import styled from 'styled-components';

import Button from '$/components/Button';
import MainLayout from '$/containers/Layouts/Main';

export const Container = styled(MainLayout)``;

export const Politicians = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -3rem;

  > * {
    margin-top: 3rem;
  }
`;

export const SelfDelegate = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bdazzledBlue};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  margin-top: 2rem;
  padding: 1rem;
`;

export const SelfDelegateText = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
  padding-right: 1rem;
`;

export const SelfDelegateButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.white};
  height: fit-content;
  min-width: fit-content;
`;
