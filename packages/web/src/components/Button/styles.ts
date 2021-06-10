import styled from 'styled-components';

export const Container = styled.button`
  background-color: ${({ theme }) => theme.colors.bdazzledBlue};
  border-radius: 0.25rem;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 0.5rem;

  :active {
    opacity: 0.7;
  }

  :disabled {
    cursor: initial;
    opacity: 0.3;
  }
`;
