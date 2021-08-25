import styled from 'styled-components';

import DefaultProposalState from '$/components/ProposalState';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-left: 0;
  border-right: 0;
  display: grid;
  grid-template-columns: auto 7rem;
  padding: 1rem 0;
`;

export const ProposalState = styled(DefaultProposalState)`
  height: fit-content
`;

export const Text = styled.p`
  margin: 0;
`;
