// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./IERC20Hooked.sol";
import "./MintControl.sol";

contract Dandercoin is AccessControl, ERC20, MintControl {
  mapping (uint256 => IERC20Hooked) private hookedContracts;
  uint256 private hookedContractsLength;

  constructor(
    uint256 initialSupply,
    uint256 maxGlobalInflation
  ) ERC20("Dandercoin", "DANDER") MintControl(maxGlobalInflation) {
    _mint(msg.sender, initialSupply);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function installHook(IERC20Hooked hookedContract) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

    hookedContracts[hookedContractsLength] = hookedContract;
    hookedContractsLength++;
  }

  function uninstallHook(IERC20Hooked hookedContract) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

    IERC20Hooked lastContract = hookedContracts[hookedContractsLength - 1];

    uint256 i = 0;
    while (i < hookedContractsLength) {
      IERC20Hooked currentContract = hookedContracts[i];

      if (address(currentContract) == address(hookedContract)) {
        // Because we don't care about the order of the list, the most efficient
        // method of removing elements from it is to overwrite the element we
        // want to delete with the last element, and remove the last one.
        // This way we have a list without gaps and without needing to shift
        // elements.
        hookedContracts[i] = lastContract;
        delete hookedContracts[hookedContractsLength - 1];
        hookedContractsLength--;
        break;
      }

      i++;
    }
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    for (uint i = 0; i < hookedContractsLength; i++) {
      IERC20Hooked hookedContract = hookedContracts[i];
      if (address(hookedContract) != address(0)) {
        hookedContract.onTransfer(from, to, amount);
      }
    }
  }

  function _canAuthorizeMinter(address account) internal view override returns (bool) {
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }

  // Bridge to allow MintControl to access the _mint method from ERC20
  function _performUnrestrictedMint(address account, uint256 amount) internal override {
    _mint(account, amount);
  }
}
