import styled from 'styled-components';

import ProposalState from '$/components/ProposalState';

export const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
  display: flex;
  padding: 1rem 0;

  :first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.silver};
  }
`;

export const Title = styled.a`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.weights.regular};
  text-decoration: none;
`;

export const Number = styled.span`
  color: ${({ theme }) => theme.colors.black70};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.weights.light};
`;

export const State = styled(ProposalState)`
  margin-left: auto;
`;
