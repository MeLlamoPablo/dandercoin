import governorAbi from '$/assets/contracts/GovernorBravo.abi.json';

import useGetContract from './useGetContract';

export default function useGetDistributorContract() {
  return useGetContract({
    abi: governorAbi as any,
    address: process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS ?? '',
  });
}
