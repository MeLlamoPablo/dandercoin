import isFuture from 'date-fns/isFuture';
import addHours from 'date-fns/fp/addHours';
import { useRouter } from 'next/router';

import type { VerifyStep } from '$/components/VerifySteps/types';

const getExpirationTime = addHours(1);

export function useCurrentStep(): VerifyStep {
  const {
    query: { email, sig, token, t },
  } = useRouter();

  if (typeof email === 'string' && typeof token === 'string') {
    return 'sign-verification';
  }

  if (
    typeof email === 'string' &&
    typeof sig === 'string' &&
    typeof t === 'string' &&
    // Ensure the signed verification hasn't expired
    isFuture(getExpirationTime(+t * 1000))
  ) {
    return 'publish-identity';
  }

  return 'enter-email';
}
