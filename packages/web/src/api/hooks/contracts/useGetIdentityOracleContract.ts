import identityOracleAbi from '$/assets/contracts/IdentityOracle.abi.json';

import useGetContract from './useGetContract';

export default function useGetIdentityOracleContract() {
  return useGetContract({
    abi: identityOracleAbi as any,
    address: process.env.NEXT_PUBLIC_IDENTITY_ORACLE_CONTRACT_ADDRESS ?? '',
  });
}
