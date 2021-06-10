import useWallet from '$/api/hooks/wallet/useWallet';

import { useCurrentStep } from './logic';

export default function useConnect() {
  const { data } = useWallet();
  const account = data?.account;

  const currentStep = useCurrentStep();

  return {
    account,
    currentStep,
  };
}
