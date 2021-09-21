export type Props = {
  id: number;
  state:
    | 'active'
    | 'canceled'
    | 'defeated'
    | 'executed'
    | 'expired'
    | 'pending'
    | 'queued'
    | 'succeeded';
  title: string;
  url: string;
};
