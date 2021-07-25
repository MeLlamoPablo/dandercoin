import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;

  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const Actions = styled.div`
  margin-top: 0.3rem;

  * + * {
    margin-left: 0.5rem;
  }
`;
