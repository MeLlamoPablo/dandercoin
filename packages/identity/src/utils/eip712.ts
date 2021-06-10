// Adapted from https://github.com/AztecProtocol/aztec-crypto-js/blob/31cef50c52c633b2865483cd8e449f6e9c80fb5f/eip712/eip712.js

/**
 * Module to construct ECDSA messages for structured data,
 * following the [EIP712]{@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md} standard
 *
 * @module eip712
 */

import type BN from 'bn.js';
import Web3Abi from 'web3-eth-abi';
import type { AbiCoder } from 'web3-eth-abi';
import { padLeft, sha3 } from 'web3-utils';

const Abi = (Web3Abi as unknown) as AbiCoder;

type Types = Record<string, ReadonlyArray<{ name: string; type: string }>>;

function padKeccak256(data: string | BN) {
  return padLeft(sha3(data)?.slice(2) ?? '0', 64);
}

/**
 * Create 'type' component of a struct
 *
 * @method encodeStruct
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @returns {string} encoded type string
 */
export function encodeStruct(primaryType: string, types: Types): any {
  const findTypes = (type: string): any =>
    [type].concat(
      types[type]?.reduce((acc: any, { type: typeKey }) => {
        if (types[typeKey] && acc.indexOf(typeKey) === -1) {
          return [...acc, ...findTypes(typeKey)];
        }
        return acc;
      }, []),
    );
  return [primaryType]
    .concat(
      findTypes(primaryType)
        .sort((a: any, b: any) => a.localeCompare(b))
        .filter((a: any) => a !== primaryType),
    )
    .reduce(
      (acc, key) =>
        `${acc}${key}(${types[key]
          ?.reduce(
            (iacc: any, { name, type }: any) => `${iacc}${type} ${name},`,
            '',
          )
          .slice(0, -1)})`,
      '',
    );
}

/**
 * Recursively encode a struct's data into a unique string
 *
 * @method encodeMessageData
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} message the struct instance's data
 * @returns {string} encoded message data string
 */
export function encodeMessageData(
  types: Types,
  primaryType: string,
  message: Record<string, any>,
): any {
  return types[primaryType]?.reduce((acc: any, { name, type }: any) => {
    if (types[type]) {
      return `${acc}${padKeccak256(
        `0x${encodeMessageData(types, type, message[name])}`,
      )}`;
    }
    if (type === 'string' || type === 'bytes') {
      return `${acc}${padKeccak256(message[name])}`;
    }
    if (type.includes('[')) {
      return `${acc}${padKeccak256(Abi.encodeParameter(type, message[name]))}`;
    }
    return `${acc}${Abi.encodeParameters([type], [message[name]]).slice(2)}`;
  }, padKeccak256(encodeStruct(primaryType, types)));
}

/**
 * Construct ECDSA signature message for structured data
 *
 * @method encodeTypedData
 * @param {Object} typedData the EIP712 struct object
 * @returns {string} encoded message string
 */
export function encodeTypeData(typedData: {
  domain: {
    chainId: string;
    name: string;
    verifyingContract: string;
    version: string;
  };
  primaryType: string;
  message: Record<string, unknown>;
  types: Types;
}) {
  const domainHash = padKeccak256(
    `0x${encodeMessageData(typedData.types, 'EIP712Domain', typedData.domain)}`,
  );
  const structHash = padKeccak256(
    `0x${encodeMessageData(
      typedData.types,
      typedData.primaryType,
      typedData.message,
    )}`,
  );

  return `0x${padKeccak256(`0x1901${domainHash}${structHash}`)}`;
}
