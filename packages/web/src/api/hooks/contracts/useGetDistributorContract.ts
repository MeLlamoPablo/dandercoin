import dandercoinAbi from '$/assets/contracts/Distributor.abi.json';

import useGetContract from './useGetContract';

export default function useGetDistributorContract() {
  return useGetContract({
    abi: dandercoinAbi as any,
    address: process.env.NEXT_PUBLIC_DISTRIBUTOR_CONTRACT_ADDRESS ?? '',
  });
}
