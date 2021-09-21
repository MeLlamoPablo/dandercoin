export type FinishVerificationVariables = {
  address: string;
  email: string;
  signature: string;
  token: string;
};

export type FinishVerificationResponse = {
  signature: string;
  timestamp: number;
};
