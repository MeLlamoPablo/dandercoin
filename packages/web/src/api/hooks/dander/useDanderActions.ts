import { useMutation, useQueryClient } from 'react-query';

import useClaimDanderMutation from '$/api/mutations/dander/claimDander';
import { GET_CLAIMABLE_DANDER_QUERY_KEY } from '$/api/queries/dander/getClaimableDander';
import { GET_DANDER_BALANCE_QUERY_KEY } from '$/api/queries/dander/getDanderBalance';

export default function useDanderActions() {
  const client = useQueryClient();

  const {
    isLoading: isClaimDanderLoading,
    isSuccess: isClaimDanderSuccess,
    mutate: claimDander,
  } = useMutation(useClaimDanderMutation(), {
    onSettled: async (_, __, { address }) => {
      await Promise.all([
        client.invalidateQueries(
          GET_CLAIMABLE_DANDER_QUERY_KEY({ account: address }),
        ),
        client.invalidateQueries(
          GET_DANDER_BALANCE_QUERY_KEY({ account: address }),
        ),
      ]);
    },
  });

  return {
    claimDander,
    isLoading: isClaimDanderLoading,
    isClaimDanderSuccess,
  };
}
