import type { NextPage } from 'next';
import Head from 'next/head';

import RankingsView from '$/containers/Views/Rankings';

const RankingsPage: NextPage = () => (
  <>
    <Head>
      <title>Rankings | Dandercoin</title>
    </Head>
    <RankingsView />
  </>
);

export default RankingsPage;
