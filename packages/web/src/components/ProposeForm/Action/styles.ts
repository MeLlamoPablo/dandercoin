import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: 0.25rem;
  padding: 1rem;

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export { FormActions, InputGroup, Label } from '../styles';
