import styled from 'styled-components';

export const Container = styled.a`
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.silver};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  overflow: hidden;
  padding-right: 0.5rem;
  text-decoration: none;
`;

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
`;

export const Email = styled.span`
  display: block;
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Address = styled.span`
  color: ${({ theme }) => theme.colors.black}cc;
  font-size: 10px;
  margin-left: auto;
`;
