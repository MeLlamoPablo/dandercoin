export type Props = {
  className?: string;
  state:
    | 'active'
    | 'canceled'
    | 'defeated'
    | 'executed'
    | 'expired'
    | 'pending'
    | 'queued'
    | 'succeeded';
};
