import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { useMemo } from 'react';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import setupClient from '$/api/client';
import useStorage from '$/api/storage';
import NetworkMismatchModal from '$/containers/Services/NetworkMismatchModal';
import Web3Provider from '$/containers/Services/Web3Service';
import { GlobalStyle } from '$/styles/global';
import themes from '$/styles/themes';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const client = useMemo(setupClient, []);
  useStorage(client);

  return (
    <ThemeProvider theme={themes.light}>
      <QueryClientProvider client={client}>
        <Web3Provider>
          <GlobalStyle />
          <NetworkMismatchModal />
          <Component {...pageProps} />
        </Web3Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
