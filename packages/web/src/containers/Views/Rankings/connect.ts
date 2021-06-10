import { useRankings } from './logic';

export default function useConnect() {
  const accounts = useRankings();

  return { accounts };
}
