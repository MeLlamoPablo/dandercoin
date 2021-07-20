import styled, { css } from 'styled-components';

export const Container = styled.span<{ $verified: boolean }>`
  color: ${({ theme }) => theme.colors.black70};
  font-size: 0.8rem;
  margin-top: 0.25rem;

  ${({ $verified }) =>
    $verified &&
    css`
      color: darkgreen;
    `};
`;
