import type { FC } from 'react';
import { createContext, useContext } from 'react';

import { useWeb3Context } from './logic';

type ContextType = ReturnType<typeof useWeb3Context>;

const Context = createContext<ContextType>({
  getMetamask: (() =>
    Promise.reject(
      'Context not yet initialized',
    )) as ContextType['getMetamask'],
  getTorus: (() =>
    Promise.reject('Context not yet initialized')) as ContextType['getTorus'],
});

const Web3Provider: FC = ({ children }) => {
  const value = useWeb3Context();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Web3Provider;

export function useGetMetamask() {
  return useContext(Context).getMetamask;
}

export function useGetTorus() {
  return useContext(Context).getTorus;
}

export { hasMetamask } from './logic';
