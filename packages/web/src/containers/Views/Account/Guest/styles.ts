import styled from 'styled-components';

import Button from '$/components/Button';

export const Container = styled.div``;

export const Paragraph = styled.p``;

export const Providers = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  margin: 3rem 0;
`;

export const Provider = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.silver}64;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 4rem;
`;

export const ProviderTitle = styled.h3`
  margin-top: 0;
`;

export const ProviderLogo = styled.div`
  align-items: center;
  display: flex;
  min-height: 10rem;
`;

export const ProviderButton = styled(Button)`
  margin: 1rem 0;
`;

export const ProviderInfo = styled(Paragraph)`
  font-size: 0.875rem;
`;
