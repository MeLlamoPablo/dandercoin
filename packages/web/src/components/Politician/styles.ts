import styled from 'styled-components';

import DefaultButton from '$/components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export const Picture = styled.picture``;

export const Image = styled.img`
  border-radius: 0.5rem;
`;

export const NameLink = styled.a`
  color: ${({ theme }) => theme.colors.bdazzledBlue};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.weights.semiBold};
  margin: 1rem 0 0;
  text-decoration: none;
`;

export const Prefix = styled.span`
  color: ${({ theme }) => theme.colors.bdazzledBlue70};
  font-size: 0.9rem;
`;

export const Power = styled.span`
  color: ${({ theme }) => theme.colors.black70};
  margin-top: 0.25rem;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`;

export const Button = styled(DefaultButton)`
  align-self: center;
`;
