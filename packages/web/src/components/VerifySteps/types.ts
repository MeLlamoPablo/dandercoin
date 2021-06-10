export type VerifyStep =
  | 'enter-email'
  | 'sign-verification'
  | 'publish-identity';

export type Props = {
  current: VerifyStep;
};
