import type BN from 'bn.js';
import Web3 from 'web3';

export function parseWeiAmount(input: BN) {
  const etherString = Web3.utils.fromWei(input, 'ether');
  return Number.parseFloat(etherString);
}

export function formatWeiAmount(input: BN) {
  return `${parseWeiAmount(input)} DANDER`;
}
