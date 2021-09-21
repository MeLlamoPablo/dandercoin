import type { FormEvent } from 'react';
import { useCallback } from 'react';

import useVerificationActions from '$/api/hooks/verification/useVerificationActions';

export function useSubmitHandler() {
  const {
    isLoading,
    isSendVerificationEmailSuccess,
    sendVerificationEmail,
  } = useVerificationActions();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email =
        (e.target instanceof HTMLFormElement && e.target.email.value) ?? '';

      sendVerificationEmail({ email });
    },
    [sendVerificationEmail],
  );

  return { isLoading, isSendVerificationEmailSuccess, onSubmit };
}
