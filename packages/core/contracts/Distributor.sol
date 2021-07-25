// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Dandercoin.sol";
import "./IdentityOracle.sol";

/*
 * The Distributor contract is a convenient framework for distributing tokens
 * to the community.
 *
 * Holders of Dandercoin may send ("grant") tokens to any email address. Then,
 * the owner of the email address can link an account through the
 * IdentityOracle and claim the granted tokens.
 *
 * This has some advantages over distributing tokens using simple transactions:
 *
 * - Tokens can be sent before users register their addresses.
 * - Expanding on the above, granters renounce ownership to the tokens. If the
 *   grantee never claims them, they will be locked forever, provided the
 *   IdentityOracle is not malicious.
 * - Users pay gas for claiming their tokens. Grants can be batched.
 */
contract Distributor {
  uint public constant CLAIMING_PERIOD = 365 days;

  struct Grantee {
    uint256 balance;
    bytes32 emailHash;
  }

  struct Grant {
    uint256 balance;
    uint timestamp;
  }

  Dandercoin private dandercoin;
  IdentityOracle private identityOracle;

  mapping(bytes32 => Grant) private grantees;

  constructor(Dandercoin _dandercoin, IdentityOracle _identityOracle) {
    dandercoin = _dandercoin;
    identityOracle = _identityOracle;
  }

  function getClaimableBalanceByAddress(
    address account
  ) public view returns (uint256) {
    return getClaimableBalanceByEmail(
      keccak256(bytes(identityOracle.getEmailByAccount(account)))
    );
  }

  function getClaimableBalanceByEmail(
    bytes32 emailHash
  ) public view returns (uint256) {
    return grantees[emailHash].balance;
  }

  function getDeadlineByEmail(
    bytes32 emailHash
  ) public view returns (uint256) {
    return grantees[emailHash].timestamp + CLAIMING_PERIOD;
  }

  function getUnclaimedBalance() public view returns (uint256) {
    return dandercoin.balanceOf(address(this));
  }

  /**
   * Allows anyone to claim DANDER tokens on behalf of any verified account.
   */
  function burnFor(bytes32 emailHash) public {
    uint256 balance = getClaimableBalanceByEmail(emailHash);
    require(balance > 0, "This email doesn't have any claimable balance!");
    require(
      block.timestamp > getDeadlineByEmail(emailHash),
      "Grant still in claiming period"
    );

    delete grantees[emailHash];

    dandercoin.burn(balance);
  }

  /**
   * Allows anyone to claim DANDER tokens on behalf of any verified account.
   */
  function claimFor(address account) public {
    string memory email = identityOracle.getEmailByAccount(account);
    bytes32 emailHash = keccak256(bytes(email));
    uint256 balance = getClaimableBalanceByEmail(emailHash);
    require(balance > 0, "This account doesn't have any claimable balance!");

    delete grantees[emailHash];

    dandercoin.transfer(account, balance);
  }

  /**
   * Allows anyone to lock their tokens in the Distributor contract for a set
   * of email addresses. Once the grantees verify their email addresses with
   * the IdentityOracle, they will be able to claim their tokens.
   */
  function grant(Grantee[] memory newGrantees) public {
    uint256 total = 0;

    // Calculate how much the callers owes us.
    for (uint i = 0; i < newGrantees.length; i++) {
      Grantee memory grantee = newGrantees[i];
      total += grantee.balance;
    }

    // Collect the owed tokens from the caller, or the transaction reverts.
    dandercoin.transferFrom(msg.sender, address(this), total);

    // Now that we have the tokens, update the state with the new balances.
    // This is a bit less efficient because we iterate the array twice, but we
    // do this for extra security as it is a good practice to only update state
    // AFTER all checks have passed.
    for (uint i = 0; i < newGrantees.length; i++) {
      Grantee memory grantee = newGrantees[i];
      grantees[grantee.emailHash].balance += grantee.balance;
      grantees[grantee.emailHash].timestamp += block.timestamp;
    }
  }
}
