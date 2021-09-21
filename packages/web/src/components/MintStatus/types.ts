import type BN from 'bn.js';

export type Props = {
  className?: string;
  remainingMintCapacity: BN;
  yearlyMintLimit: BN;
};
