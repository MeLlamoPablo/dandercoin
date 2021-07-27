import PoliticianView from '$/components/Politician';

import useConnect from './connect';
import type { Props } from './types';

export default function Politician({ politician }: Props): JSX.Element {
  const { handle, isCurrentDelegate, votes, votesPercent } = useConnect({
    politician,
  });

  return (
    <PoliticianView
      address={politician.address}
      description={politician.description}
      imagePng400={politician.images.png400}
      imagePng600={politician.images.png600}
      imagePng800={politician.images.png800}
      imageWebp400={politician.images.webp400}
      imageWebp600={politician.images.webp600}
      imageWebp800={politician.images.webp800}
      isCurrentDelegate={isCurrentDelegate}
      name={politician.name}
      onDelegate={handle.delegate}
      prefix={politician.prefix}
      votes={votes}
      votesPercent={votesPercent}
    />
  );
}
