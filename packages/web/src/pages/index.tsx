import type { NextPage } from 'next';
import Head from 'next/head';

import banner from '$/assets/images/banner.png';
import HomeView from '$/containers/Views/Home';

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Dandercoin</title>
      <meta name="title" content="Dandercoin" />
      <meta name="description" content="La moneda del pueblo. Coming soon™." />
      <meta property="og:image" content={banner.src} />
    </Head>
    <HomeView />
  </>
);

export default HomePage;
