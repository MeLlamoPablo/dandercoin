import styled from 'styled-components';

import MainLayout from '$/containers/Layouts/Main';
import { Content as MainLayoutContent } from '$/containers/Layouts/Main/styles';

export const Container = styled(MainLayout)`
  ${MainLayoutContent} {
    display: grid;
    grid-template-columns: 13rem auto;
  }
`;

export const Content = styled.div``;
