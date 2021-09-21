import styled from 'styled-components';

import Button from '$/components/Button';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 20rem;
  grid-gap: 2rem;
`;

export const Balance = styled.div`
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.silver};
  display: flex;
  grid-column: span 2;
  justify-content: center;
  padding: 1rem;
`;

export const BalanceText = styled.span`
  font-size: 1.7rem;
  margin-left: 1rem;
`;

export const Info = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: 0.25rem;
  padding: 1rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const DataName = styled.span`
  font-weight: ${({ theme }) => theme.weights.semiBold};
  margin-bottom: 0.25rem;
`;

export const DataValue = styled.p`
  color: ${({ theme }) => theme.colors.black}c1;
  margin: 0;
`;

export const Sidebar = styled.div``;

const Provider = styled.div`
  border: 1px solid black;
  border-radius: 0.25rem;
`;

const ProviderHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const ProviderButton = styled(Button)`
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const ProviderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const MetamaskProvider = styled(Provider)`
  border-color: ${({ theme }) => theme.colors.metamask};
`;

export const MetamaskHeader = styled(ProviderHeader)`
  background-color: ${({ theme }) => theme.colors.metamask};
`;

export const MetamaskButton = styled(ProviderButton)`
  color: ${({ theme }) => theme.colors.metamask};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.metamask};
`;

export const TorusProvider = styled(Provider)`
  border-color: ${({ theme }) => theme.colors.torus};
`;

export const TorusHeader = styled(ProviderHeader)`
  background-color: ${({ theme }) => theme.colors.torus};
`;

export const TorusButton = styled(ProviderButton)`
  color: ${({ theme }) => theme.colors.torus};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.torus};
`;

export const DangerButton = styled(ProviderButton)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid ${({ theme }) => theme.colors.danger};
`;
