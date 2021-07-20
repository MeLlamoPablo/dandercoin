import { useMemo } from 'react';

export function useAddressVerification(address: string | undefined) {
  return useMemo(() => {
    const lowercase = address?.toLowerCase();

    if (
      lowercase ===
      process.env.NEXT_PUBLIC_DANDERCOIN_CONTRACT_ADDRESS?.toLowerCase()
    ) {
      return 'Dandercoin (ERC20)';
    }

    if (
      lowercase ===
      process.env.NEXT_PUBLIC_DISTRIBUTOR_CONTRACT_ADDRESS?.toLowerCase()
    ) {
      return 'Distributor';
    }

    if (
      lowercase ===
      process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS?.toLowerCase()
    ) {
      return 'GovernorBravo';
    }

    if (
      lowercase ===
      process.env.NEXT_PUBLIC_IDENTITY_ORACLE_CONTRACT_ADDRESS?.toLowerCase()
    ) {
      return 'IdentityOracle';
    }

    if (
      lowercase ===
      process.env.NEXT_PUBLIC_TIMELOCK_CONTRACT_ADDRESS?.toLowerCase()
    ) {
      return 'Timelock';
    }

    return undefined;
  }, [address]);
}
