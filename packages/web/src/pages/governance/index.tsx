import type { NextPage } from 'next';
import Head from 'next/head';

import GovernanceView from '$/containers/Views/Governance';

const GovernancePage: NextPage = () => (
  <>
    <Head>
      <title>Governance | Dandercoin</title>
    </Head>
    <GovernanceView />
  </>
);

export default GovernancePage;
