import type { Props as ParentProps } from '../types';

export type Props = {
  politician: ParentProps['politicians'][number];
};
