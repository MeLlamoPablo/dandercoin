import styled, { css } from 'styled-components';

export const Container = styled.ol`
  margin: 0;
  padding-left: 1.5rem;

  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const Item = styled.li<{ $isCurrent: boolean }>`
  color: ${({ theme }) => theme.colors.bdazzledBlue};

  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      font-weight: ${({ theme }) => theme.weights.semiBold};
    `};
`;
