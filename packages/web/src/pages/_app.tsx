import type { AppProps } from 'next/app';
import type { FC } from 'react';

import { GlobalStyle } from '$/styles/global';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default App;
