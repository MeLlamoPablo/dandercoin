import styled from 'styled-components';

export const Container = styled.form``;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.weights.semiBold};
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 25rem;

  > *:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;
