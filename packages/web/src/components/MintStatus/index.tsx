import type { FC } from 'react';
import type { Props } from './types';
import { formatWeiAmount } from '../../utils/formatWeiAmount';

const MintStatus: FC<Props> = ({
  className,
  remainingMintCapacity,
  yearlyMintLimit,
}) => (
  <span className={className}>
    {formatWeiAmount(remainingMintCapacity)} restantes de{' '}
    {formatWeiAmount(yearlyMintLimit)} anuales
  </span>
);

export default MintStatus;
