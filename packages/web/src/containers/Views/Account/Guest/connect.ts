import {
  useHandleConnectMetamask,
  useHandleConnectTorus,
  useHasMetamask,
} from './logic';

export default function useConnect() {
  const hasMetamask = useHasMetamask();

  const handleConnectMetamask = useHandleConnectMetamask();
  const handleConnectTorus = useHandleConnectTorus();

  return {
    handle: {
      connectMetamask: handleConnectMetamask,
      connectTorus: handleConnectTorus,
    },
    hasMetamask,
  };
}
