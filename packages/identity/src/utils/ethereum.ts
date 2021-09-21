import { Buffer } from 'buffer';
import { ecsign, toRpcSig } from 'ethereumjs-util';
import Web3Accounts from 'web3-eth-accounts';
import type { Accounts as AccountsInstanceType } from 'web3-eth-accounts';

import { CHAIN_ID } from '$/config';

import { encodeTypeData } from './eip712';
import { env } from './env';

const Accounts: AccountsInstanceType = new (Web3Accounts as any)();

const EIP712DomainType = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
};

function hexToBuffer(hex: string) {
  // substr 2 to remove the "0x" prefix
  return Buffer.from(hex.substr(2), 'hex');
}

/**
 * Given a message (email and timestamp), and its signature, recover the
 * address of the Ethereum account who signed it. It's important to note that
 * the hash must be generated on the back-end, or otherwise the client could
 * send a forged hash that can result in recovering any arbitrary account.
 */
export function getIdentitySignerAddress({
  email,
  signature,
  token,
}: {
  email: string;
  signature: string;
  token: string;
}): string {
  const hash = encodeTypeData({
    domain: {
      name: 'Dandercoin Identity Verification',
      verifyingContract: '0x0000000000000000000000000000000000000000',
      chainId: CHAIN_ID,
      version: '1',
    },
    message: {
      email,
      token,
    },
    primaryType: 'Identity',
    types: {
      ...EIP712DomainType,
      Identity: [
        { name: 'email', type: 'string' },
        { name: 'token', type: 'string' },
      ],
    },
  });

  return Accounts.recover(hash, signature, true).toLowerCase();
}

export function signVerification({
  address,
  email,
}: {
  address: string;
  email: string;
}) {
  // Ethereum wants seconds, not milliseconds
  const timestamp = Math.floor(Date.now() / 1000);

  const hash = encodeTypeData({
    domain: {
      name: 'Dandercoin IdentityOracle',
      verifyingContract: env('IDENTITY_ORACLE_ADDRESS'),
      chainId: CHAIN_ID,
      version: '1',
    },
    message: {
      account: address,
      email,
      timestamp,
    },
    primaryType: 'Identity',
    types: {
      ...EIP712DomainType,
      Identity: [
        { name: 'account', type: 'address' },
        { name: 'email', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
      ],
    },
  });

  const { v, r, s } = ecsign(
    hexToBuffer(hash),
    hexToBuffer(env('IDENTITY_SIGNING_KEY')),
  );

  const signature = toRpcSig(v, r, s);

  return { signature, timestamp };
}
