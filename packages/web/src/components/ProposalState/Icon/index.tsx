import {
  FaBalanceScale,
  FaRegComments,
  FaTimes,
  FaExclamation,
  FaCheck,
  FaRegClock,
} from 'react-icons/fa';

import type { Props } from '../types';

export default function Icon({ state, ...props }: Props): JSX.Element {
  const Component = (() => {
    switch (state) {
      case 'active':
        return FaBalanceScale;
      case 'canceled':
      case 'expired':
        return FaExclamation;
      case 'defeated':
        return FaTimes;
      case 'executed':
      case 'succeeded':
        return FaCheck;
      default:
      case 'pending':
        return FaRegComments;
      case 'queued':
        return FaRegClock;
    }
  })();

  return <Component {...props} />;
}
