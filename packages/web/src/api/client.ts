import { QueryClient } from 'react-query';

export default function setupClient() {
  return new QueryClient();
}
