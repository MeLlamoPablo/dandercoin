// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20VotesComp.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

import "./MintControl.sol";

contract Dandercoin is AccessControl, ERC20VotesComp, MintControl {
  constructor(
    uint256 initialSupply,
    uint256 maxGlobalInflation
  )
    ERC20("Dandercoin", "DANDER")
    // Required by ERC20VotesComp
    ERC20Permit("Dandercoin")
    MintControl(maxGlobalInflation)
  {
    _mint(msg.sender, initialSupply);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  /**
    * @dev Destroys `amount` tokens from the caller. Allows token holders to
    * destroy their own tokens, in a way that can be recognized off-chain (via
    *  event analysis).
    *
    * See {ERC20-_burn}.
    */
  function burn(uint256 amount) public virtual {
    _burn(_msgSender(), amount);
  }

  function _canAuthorizeMinter(address account) internal view override returns (bool) {
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }

  // Bridge to allow MintControl to access the _mint method from ERC20
  function _performUnrestrictedMint(address account, uint256 amount) internal override {
    _mint(account, amount);
  }
}
