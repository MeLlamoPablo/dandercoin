import { useMutation } from 'react-query';

import useFinishVerificationMutation from '$/api/mutations/verification/finishVerification';
import usePublishVerificationMutation from '$/api/mutations/verification/publishVerification';
import useSendVerificationEmailMutation from '$/api/mutations/verification/sendVerificationEmail';

export default function useVerificationActions() {
  const {
    isLoading: isSendVerificationEmailLoading,
    isSuccess: isSendVerificationEmailSuccess,
    mutate: sendVerificationEmail,
  } = useMutation(useSendVerificationEmailMutation());

  const {
    isLoading: isFinishVerificationLoading,
    mutateAsync: finishVerification,
  } = useMutation(useFinishVerificationMutation());

  const {
    isLoading: isPublishVerificationLoading,
    isSuccess: isPublishIdentitySuccess,
    mutate: publishVerification,
  } = useMutation(usePublishVerificationMutation());

  return {
    finishVerification,
    isLoading:
      isFinishVerificationLoading ||
      isSendVerificationEmailLoading ||
      isPublishVerificationLoading,
    isPublishIdentitySuccess,
    isSendVerificationEmailSuccess,
    publishVerification,
    sendVerificationEmail,
  };
}
