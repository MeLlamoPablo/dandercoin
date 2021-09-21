import type { NextPage } from 'next';
import Head from 'next/head';

import VerifyView from '$/containers/Views/Verify';

const VerifyPage: NextPage = () => (
  <>
    <Head>
      <title>Verificar identidad | Dandercoin</title>
    </Head>
    <VerifyView />
  </>
);

export default VerifyPage;
