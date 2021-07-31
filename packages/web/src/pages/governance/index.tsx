import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import GovernanceView from '$/containers/Views/Governance';

const GovernancePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ politicians }) => (
  <>
    <Head>
      <title>Governance | Dandercoin</title>
    </Head>
    <GovernanceView politicians={politicians} />
  </>
);

export default GovernancePage;

export async function getStaticProps() {
  const { readdir, readFile } = await import('fs/promises');
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { join, dirname } = await import('path');
  const { default: sharp } = await import('sharp');
  const { fileURLToPath } = await import('url');

  const basePath = join(dirname(fileURLToPath(import.meta.url)), '../../..');
  const politiciansImagesPath = join(basePath, 'src/assets/politicians/images');
  const politiciansDataPath = join(basePath, 'src/assets/politicians/data');
  const publicImagesPath = join(basePath, 'public/images/politicians');

  const politicianFiles = await readdir(politiciansDataPath);

  async function importPolitician(file: string) {
    const raw = await readFile(join(politiciansDataPath, file), 'utf-8');
    const data = JSON.parse(raw) as {
      prefix: string;
      name: string;
      image: string;
      description: string;
      networks: ReadonlyArray<{
        address: string;
        chainId: number;
      }>;
    };

    const network = data.networks.find(
      (it) => it.chainId === +(process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID ?? 0),
    );

    if (!network) {
      return undefined;
    }

    const image = await readFile(join(politiciansImagesPath, data.image));
    const rawFileName = /(.+)\..+/.exec(data.image)?.[1] ?? '';

    async function createImage(
      width: number,
      height: number,
      extension: 'png' | 'webp',
    ) {
      const fileName = `${rawFileName}-${width}.${extension}`;

      await sharp(image)
        .resize({
          width,
          height,
        })
        [extension]()
        .toFile(join(publicImagesPath, fileName));

      return `/images/politicians/${fileName}`;
    }

    const [
      png800,
      png600,
      png400,
      webp800,
      webp600,
      webp400,
    ] = await Promise.all([
      createImage(800, 600, 'png'),
      createImage(600, 450, 'png'),
      createImage(400, 300, 'png'),
      createImage(800, 600, 'webp'),
      createImage(600, 450, 'webp'),
      createImage(400, 300, 'webp'),
    ]);

    return {
      address: network.address,
      description: data.description,
      images: {
        png800,
        png600,
        png400,
        webp800,
        webp600,
        webp400,
      },
      name: data.name,
      prefix: data.prefix,
    };
  }

  const politicians = (
    await Promise.all(politicianFiles.map(importPolitician))
  ).filter((it): it is NonNullable<typeof it> => !!it);

  return {
    props: {
      politicians,
    },
  };
}
