import { useSignVerificationToken } from './logic';

export default function useConnect() {
  const { isLoading, onSignVerificationToken } = useSignVerificationToken();

  return {
    handle: {
      signVerificationToken: onSignVerificationToken,
    },
    isLoading,
  };
}
