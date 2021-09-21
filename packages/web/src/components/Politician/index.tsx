import { memo } from 'react';

import { formatWeiAmount } from '$/utils/formatWeiAmount';

import {
  Button,
  Container,
  Description,
  Image,
  NameLink,
  Picture,
  Power,
  Prefix,
} from './styles';
import type { Props } from './types';

const percentageFormatter = new Intl.NumberFormat('en-Us', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Politician({
  address,
  description,
  imagePng400,
  imagePng600,
  imagePng800,
  imageWebp400,
  imageWebp600,
  imageWebp800,
  isCurrentDelegate,
  name,
  onDelegate,
  prefix,
  votes,
  votesPercent,
}: Props): JSX.Element {
  return (
    <Container>
      <Picture>
        <source
          srcSet={`${imageWebp400} 400w, ${imageWebp600} 600w, ${imageWebp800} 800w`}
          type="image/webp"
        />
        <Image
          alt=""
          height={300}
          src={imagePng800}
          srcSet={`${imagePng400} 400w, ${imagePng600} 600w, ${imagePng800} 800w`}
          width={400}
        />
      </Picture>
      <NameLink
        href={`${process.env.NEXT_PUBLIC_ETHEREUM_BLOCK_EXPLORER_URL}/address/${address}`}
        rel="noreferrer noopener"
        target="_blank"
      >
        <Prefix>{prefix}</Prefix> {name}
      </NameLink>
      {typeof votes !== 'undefined' && typeof votesPercent !== 'undefined' && (
        <Power>
          {formatWeiAmount(votes)} delegados (
          {percentageFormatter.format(votesPercent)})
        </Power>
      )}
      <Description>{description}</Description>
      <Button disabled={isCurrentDelegate} onClick={onDelegate}>
        {isCurrentDelegate ? 'Delegando mis DANDER' : 'Delegar mis DANDER'}
      </Button>
    </Container>
  );
}

export default memo(Politician);
