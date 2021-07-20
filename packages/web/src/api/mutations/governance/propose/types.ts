export type ProposeVariables = {
  actions: ReadonlyArray<{
    callData: string;
    signature: string;
    target: string;
    value: number;
  }>;
  description: string;
  from: string;
};

export type ProposeResponse = void;
