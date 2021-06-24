import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  height: 495px;
  position: relative;
`;

export const Background = styled.img`
  border-radius: 0.5rem;
  position: absolute;
`;

export const Content = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.comicSans};
  line-height: 1;
  margin: 0;
  font-size: 4.5rem;
`;
