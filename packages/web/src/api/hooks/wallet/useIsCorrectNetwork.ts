import zeroX from '$/utils/zeroX';

import useWallet from './useWallet';

const CHAIN_ID = +(process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID ?? '0');

export default function useIsCorrectNetwork():
  | 'correct'
  | 'incorrect'
  | 'loading' {
  const { data } = useWallet();

  if (typeof data?.chainId === 'undefined') {
    // Data is not loaded so can't tell. The modal won't be shown but queries
    // won't run either.
    return 'loading';
  }

  if (data.provider !== 'metamask') {
    // MetaMask is the only provider that can manage multiple networks, so if
    // the user doesn't have MetaMask we can't show the modal nor withhold
    // queries.
    return 'correct';
  }

  return data.chainId === zeroX(CHAIN_ID) ? 'correct' : 'incorrect';
}
