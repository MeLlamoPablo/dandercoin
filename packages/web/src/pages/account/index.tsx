import type { NextPage } from 'next';
import Head from 'next/head';

import AccountView from '$/containers/Views/Account';

const AccountPage: NextPage = () => (
  <>
    <Head>
      <title>Cuenta | Dandercoin</title>
    </Head>
    <AccountView />
  </>
);

export default AccountPage;
