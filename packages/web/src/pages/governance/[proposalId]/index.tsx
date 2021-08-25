import type { NextPage } from 'next';
import Head from 'next/head';

import ProposalView from '$/containers/Views/Governance/Proposal';

const ProposalPage: NextPage = () => (
  <>
    <Head>
      <title>Propuesta | Dandercoin</title>
    </Head>
    <ProposalView />
  </>
);

export default ProposalPage;
