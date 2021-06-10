import styled from 'styled-components';

export const Paragraph = styled.p`
  padding: 0 1rem;

  :first-child {
    margin-top: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  padding: 0 1rem;
`;

export const Row = styled.div`
  display: flex;
  margin-top: 0.5rem;

  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Warning = styled.div`
  background-color: ${({ theme }) => theme.colors.warning50};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.warning600};
  margin-top: 1rem;
  padding: 1rem;
`;
