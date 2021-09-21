import { usePublishIdentity } from './logic';

export default function useConnect() {
  const { isLoading, isSuccess, onPublishIdentity } = usePublishIdentity();

  return {
    handle: {
      publishIdentity: onPublishIdentity,
    },
    isLoading,
    isSuccess,
  };
}
