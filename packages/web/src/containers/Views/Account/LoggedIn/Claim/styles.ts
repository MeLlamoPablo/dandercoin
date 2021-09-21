import styled from 'styled-components';

import DefaultButton from '$/components/Button';

export const Container = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.silver};
  display: flex;
  flex-direction: column;
  grid-column: span 2;
  justify-content: center;
  padding: 1rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.comicSans};
  margin-top: 0;
  font-size: 2.5rem;
`;

export const Gif = styled.img`
  width: 470px;
  height: 376px;
`;

export const Button = styled(DefaultButton)`
  margin-top: 1rem;
`;
