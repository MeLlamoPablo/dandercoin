// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./types/Identity.sol";
import "./utils/StringUtils.sol";

/*
 * The IdentityOracle contract stores relationships between Ethereum addresses
 * and email addresses. It verifies identity through the centralized identity
 * API located at 'packages/identity'. The verification flow is the following:
 *
 * 1. Users send their email address to the Identity API.
 * 2. The Identity API sends an email to that address containing an unique token.
 * 3. The user sign that token to prove ownership of the Ethereum account.
 * 4. Once the Identity API has verified ownership over both the email and
 *    Ethereum account, it signs an attestation containing the addresses and the
 *    timestamp (the Identity API holds the operator account private key).
 * 5. Anyone can register that attestation through the 'registerIdentity'
 *    method. The Identity API could do this directly, but they delegate that
 *    to the user so they pay gas.
 *
 * Identities can be updated and deleted, if authorized by the IdentityOracle,
 * but obviously once registered they cannot be deleted from the blockchain
 * history. This is why users must register themselves voluntarily.
 *
 * Since this is a centralized oracle, reliance on it should be kept at a
 * minimum. Currently, this is used for two purposes within the ecosystem:
 *
 * - In the Distribution contract. Arguably token distribution is always
 *   centralized, so it's not a big deal.
 * - In the web rankings. Those are read-only, so the harm that a malicious
 *   operator can do is limited.
 */
contract IdentityOracle is AccessControl, EIP712 {
  struct RegisteredIdentity {
    address account;
    string email;
  }

  uint256 constant private ONE_HOUR = 60 * 60;

  address private _operator;
  address[] private accounts;
  mapping(string => address) private accountsByEmail;
  mapping(address => string) private emailsByAccount;

  constructor() EIP712("Dandercoin IdentityOracle", "1") {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function getOperator() public view returns (address) {
    return _operator;
  }

  function getAccountByEmail(string memory email) public view returns (address) {
    return accountsByEmail[email];
  }

  function getEmailByAccount(address account) public view returns (string memory) {
    return emailsByAccount[account];
  }

  function getAccounts(
    uint8 page,
    uint32 perPage
  ) public view returns (RegisteredIdentity[] memory) {
    RegisteredIdentity[] memory returnedIdentities = new RegisteredIdentity[](
      perPage
    );

    if (page == 0) {
      return returnedIdentities;
    }

    for (uint8 i = 0; i < perPage; i++) {
      uint256 j = i + ((page - 1) * perPage);

      if (j < accounts.length) {
        returnedIdentities[i].account = accounts[j];
        returnedIdentities[i].email = getEmailByAccount(accounts[j]);
      }
    }

    return returnedIdentities;
  }

  function registerIdentity(
    address account,
    string memory email,
    uint256 timestamp,
    bytes memory operatorSignature
  ) public {
    checkSignatureValid(
      account,
      email,
      timestamp,
      operatorSignature
    );

    address oldAccount = accountsByEmail[email];
    if (oldAccount != address(0)) {
      // This same email was previously registered, therefore we are updating
      // the address (or doing nothing, in which case the caller just wasted gas)
      // Remove the previous address
      emailsByAccount[oldAccount] = '';
      removeAccountFromList(oldAccount);
    }

    string memory oldEmail = emailsByAccount[account];
    if (!StringUtils.equals(oldEmail, '')) {
      // This same address was previously registered, therefore we are updating
      // the email (or doing nothing, in which case the caller just wasted gas)
      // Remove the previous email
      accountsByEmail[oldEmail] = address(0);
    }

    if (!StringUtils.equals(email, '')) {
      accountsByEmail[email] = account;
    }
    if (account != address(0)) {
      emailsByAccount[account] = email;
    }

    if (account != address(0) && !StringUtils.equals(email, '')) {
      insertAccountToList(account);
    }
  }

  function setOperator(address newOperator) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
    _operator = newOperator;
  }

  function checkSignatureValid(
    address account,
    string memory email,
    uint256 timestamp,
    bytes memory operatorSignature
  ) private view {
    require(timestamp + ONE_HOUR > block.timestamp, "Identity signature has expired");

    bytes32 digest = _hashTypedDataV4(
      Identity.hash(
        Identity.create(account, email, timestamp)
      )
    );

    address signer = ECDSA.recover(digest, operatorSignature);

    require(signer == getOperator(), "Invalid operator signature");
  }

  function insertAccountToList(address account) private {
    (, bool found) = findIndexInList(account);

    if (found) {
      return;
    }

    accounts.push(account);
  }

  function removeAccountFromList(address account) private {
    (uint256 i, bool found) = findIndexInList(account);

    if (!found) {
      return;
    }

    // Because we don't care about the order of the list, the most efficient
    // method of removing elements from it is to overwrite the element we
    // want to delete with the last element, and remove the last one.
    // This way we have an array without gaps and without needing to shift
    // elements.
    accounts[i] = accounts[accounts.length - 1];
    delete accounts[accounts.length - 1];
  }

  function findIndexInList(address account) private view returns (uint256, bool) {
    for (uint8 i = 0; i < accounts.length; i++) {
      if (accounts[i] == account) {
        return (i, true);
      }
    }

    return (0, false);
  }
}
