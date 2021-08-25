export type VoteVariables = {
  from: string;
  proposalId: number;
  reason: string;
  type: 'for' | 'against' | 'abstain';
};

export type VoteResponse = void;
