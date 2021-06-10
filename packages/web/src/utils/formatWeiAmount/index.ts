import type BN from 'bn.js';
import Web3 from 'web3';

export function formatWeiAmount(input: BN) {
  const etherString = Web3.utils.fromWei(input, 'ether');
  const etherNumber = Number.parseFloat(etherString);

  return `${etherNumber} DANDER`;
}
