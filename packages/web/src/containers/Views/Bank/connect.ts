import useGlobalMintStatus from '$/api/hooks/dander/useGlobalMintStatus';

export default function useConnect() {
  const { data: globalMintStatus } = useGlobalMintStatus();

  return { globalMintStatus };
}
