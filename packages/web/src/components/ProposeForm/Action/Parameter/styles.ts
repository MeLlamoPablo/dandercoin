import styled from 'styled-components';
import { Container as DefaultContainer } from '../styles';

export const Container = styled(DefaultContainer)`
  display: grid;
  grid-template-columns: 10rem auto 2rem;
  grid-column-gap: 1rem;

  button {
    align-self: center;
    height: 1.7rem;
  }
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { InputGroup, Label } from '../styles';
