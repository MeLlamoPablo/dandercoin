import type BN from 'bn.js';

export type Props = {
  address: string;
  description: string;
  imagePng400: string;
  imagePng600: string;
  imagePng800: string;
  imageWebp400: string;
  imageWebp600: string;
  imageWebp800: string;
  isCurrentDelegate: boolean;
  name: string;
  onDelegate: () => void;
  prefix: string;
  votes: BN | undefined;
  votesPercent: number | undefined;
};
