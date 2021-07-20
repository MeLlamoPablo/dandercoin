import type { NextPage } from 'next';
import Head from 'next/head';

import ProposeView from '$/containers/Views/Governance/Propose';

const ProposePage: NextPage = () => (
  <>
    <Head>
      <title>Abrir Propuesta | Dandercoin</title>
    </Head>
    <ProposeView />
  </>
);

export default ProposePage;
