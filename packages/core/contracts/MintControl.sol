// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/**
 * @dev Contract module that allows children ERC20 tokens to implement
 * restrictions over how much of a token is to be minted yearly.
 *
 * MintControl allows to set an immutable global limit which will restrict the
 * amount of tokens that can be minted globally.
 *
 * The limits are specified as yearly values and are replenished on a per-block
 * basis, proportional to time passed. If the limit is full, it won't keep
 * replenishing above it.
 *
 * In order for MintControl to work, the base ERC20 contract must implement two
 * methods:
 *
 * {_canMint} tells MintControl whether an account has permission to mint
 * tokens. The base contract should implement some form of access control to
 * allow this.
 *
 * {_performUnrestrictedMint} should be a direct bridge to {ERC20}'s {_mint} so
 * MintControl can perform the minting instead. It's important to note that the
 * base contract should not call {_mint} directly but {mint}, or otherwise the
 * mint limit will be bypassed.
 */
abstract contract MintControl {
  uint256 consumed;
  uint lastMintTimestamp;
  uint256 limit;

  constructor (uint256 _limit) {
    lastMintTimestamp = block.timestamp;
    limit = _limit;
  }

  function getRemainingMintCapacity() public view returns (uint256) {
    uint256 replenishedConsumption = _getReplenishedConsumption();

    if (replenishedConsumption >= limit) {
      return 0;
    }

    return limit - replenishedConsumption;
  }

  function mint(address account, uint256 amount) public {
    require(_canMint(msg.sender), 'Insufficient permissions');

    consumed = _getReplenishedConsumption() + amount;
    lastMintTimestamp = block.timestamp;

    require(limit >= consumed, "Mint capacity exceeded");

    _performUnrestrictedMint(account, amount);
  }

  function _getReplenishedConsumption() private view returns (uint256) {
    uint approxSecondsElapsed = block.timestamp - lastMintTimestamp;
    uint256 approxReplenishPerSecond = limit / 365 days;
    uint256 approxReplenish = approxReplenishPerSecond * approxSecondsElapsed;

    if (approxReplenish > consumed) {
      return 0;
    }

    return consumed - approxReplenish;
  }

  function _canMint(address account) internal view virtual returns (bool);
  function _performUnrestrictedMint(address account, uint256 amount) internal virtual;
}
