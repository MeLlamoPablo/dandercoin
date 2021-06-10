import dandercoinAbi from '$/assets/contracts/Dandercoin.abi.json';

import useGetContract from './useGetContract';

export default function useGetDandercoinContract() {
  return useGetContract({
    abi: dandercoinAbi as any,
    address: process.env.NEXT_PUBLIC_DANDERCOIN_CONTRACT_ADDRESS ?? '',
  });
}
