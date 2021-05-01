import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const MetaMaskButton = dynamic(
  () => import('../../components/MetaMaskButton'),
  { ssr: false },
);

const AccountPage: NextPage = () => (
  <>
    <Head>
      <title>Cuenta | Dandercoin</title>
    </Head>
    <h1>Cuenta</h1>
    <MetaMaskButton />
  </>
);

export default AccountPage;
