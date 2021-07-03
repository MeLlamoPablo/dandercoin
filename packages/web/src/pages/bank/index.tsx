import type { NextPage } from 'next';
import Head from 'next/head';

import BankView from '$/containers/Views/Bank';

const BankPage: NextPage = () => (
  <>
    <Head>
      <title>DanderBank | Dandercoin</title>
    </Head>
    <BankView />
  </>
);

export default BankPage;
