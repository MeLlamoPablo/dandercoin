import { useCallback } from 'react';
import type { QueryFunction } from 'react-query';

import useGetGovernorContract from '$/api/hooks/contracts/useGetGovernorContract';

export const GET_PROPOSAL_DESCRIPTIONS_QUERY_KEY = () => [
  'governance/getProposalDescriptions',
];

function parseDescription(input: string) {
  try {
    const [title, description] = JSON.parse(input) as [string, string];
    return { description, title };
  } catch (e) {
    return { description: input, title: 'Untitled proposal' };
  }
}

export default function useGetProposalDescriptionsQuery(): QueryFunction<
  Record<number, { description: string; title: string }>
> {
  const getGovernorContract = useGetGovernorContract();

  return useCallback(async () => {
    const Governor = await getGovernorContract();

    const events = (await Governor?.getPastEvents('ProposalCreated')) ?? [];

    return events.reduce(
      (descriptions, event) => ({
        ...descriptions,
        // Subtracting 1 because the first proposal is empty
        [event.returnValues.id - 1]: parseDescription(
          event.returnValues.description,
        ),
      }),
      {},
    );
  }, [getGovernorContract]);
}
