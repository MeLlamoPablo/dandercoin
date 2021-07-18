// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

/**
 * @dev Contract module that allows children ERC20 tokens to implement
 * restrictions over how much of a token is to be minted yearly.
 *
 * MintControl allows to set an immutable global limit which will restrict the
 * amount of tokens that can be minted globally. It also allows any admins to
 * authorize minters and limit them on a per-account basis.
 *
 * Minters can't exceed their own limit, and they can't exceed the global limit.
 * It is theoretically possible for the sum of limits given to all minters
 * combined to exceed the global limit. However, the global limit can never be
 * be exceeded and this would mean that some minters would be prevented from
 * fully consuming their limit.
 *
 * The limits are specified as yearly values and are replenished on a per-block
 * basis, proportional to time passed. If the limit is full, it won't keep
 * replenishing above it.
 *
 * In order for MintControl to work, the base ERC20 contract must implement two
 * methods:
 *
 * {_canAuthorizeMinter} tells MintControl whether an account can call
 * {authorizeMinter}. The base contract should implement some form of access
 * control to allow this.
 *
 * {_performUnrestrictedMint} should be a direct bridge to {ERC20}'s {_mint} so
 * MintControl can perform the minting instead. It's important to note that the
 * base contract should not call {_mint} directly but {mint} (and authorize
 * themselves as a minter for that to work), or otherwise the mint limit will
 * be bypassed.
 */
abstract contract MintControl {
  struct Minter {
    uint256 consumed;
    uint lastMintTimestamp;
    uint256 limit;
  }

  event MinterUpdated(address minter, uint256 newLimit);

  Minter public _global;
  mapping (address => Minter) public minters;

  constructor (uint256 globalLimit) {
    _global.lastMintTimestamp = block.timestamp;
    _global.limit = globalLimit;
  }

  function authorizeMinter(address account, uint256 limit) public {
    require(
      _canAuthorizeMinter(msg.sender),
      "Caller is not allowed to authorize a minter"
    );

    minters[account].lastMintTimestamp = block.timestamp;
    minters[account].limit = limit;

    emit MinterUpdated(account, limit);
  }

  function mint(address account, uint256 amount) public {
    Minter storage minter = minters[msg.sender];

    _updateBeforeMint(minter, amount);
    _updateBeforeMint(_global, amount);

    require(
      minter.limit >= minter.consumed,
      "Local mint capacity exceeded"
    );
    require(
      _global.limit >= _global.consumed,
      "Global mint capacity exceeded"
    );

    _performUnrestrictedMint(account, amount);
  }

  function remainingGlobalMintCapacity() public view returns (uint256) {
    return _getRemainingMintCapacityOf(_global);
  }

  function remainingMintCapacityOf(address account) public view returns (uint256) {
    return _getRemainingMintCapacityOf(minters[account]);
  }

  function yearlyGlobalMintLimit() public view returns (uint256) {
    return _global.limit;
  }

  function yearlyMintLimitOf(address account) public view returns (uint256) {
    return minters[account].limit;
  }

  function _updateBeforeMint(Minter storage minter, uint256 amount) private {
    minter.consumed = _getReplenishedConsumption(
      minter.consumed,
      minter.limit,
      minter.lastMintTimestamp
    );
    minter.consumed += amount;
    minter.lastMintTimestamp = block.timestamp;
  }

  function _getRemainingMintCapacityOf(
    Minter memory minter
  ) public view returns (uint256) {
    uint256 replenishedConsumption = _getReplenishedConsumption(
      minter.consumed,
      minter.limit,
      minter.lastMintTimestamp
    );

    if (replenishedConsumption >= minter.limit) {
      return 0;
    }

    return minter.limit - replenishedConsumption;
  }

  function _getReplenishedConsumption(
    uint256 consumed,
    uint256 limit,
    uint lastTimestamp
  ) private view returns (uint256) {
    uint approxSecondsElapsed = block.timestamp - lastTimestamp;
    uint256 approxReplenishPerSecond = limit / 365 days;
    uint256 approxReplenish = approxReplenishPerSecond * approxSecondsElapsed;

    if (approxReplenish > consumed) {
      return 0;
    }

    return consumed - approxReplenish;
  }

  function _canAuthorizeMinter(address account) internal view virtual returns (bool);
  function _performUnrestrictedMint(address account, uint256 amount) internal virtual;
}
