// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../IERC20Hooked.sol";

contract MockHooked is IERC20Hooked {
  IERC20 private dandercoin;
  uint public counter;

  constructor(IERC20 _dandercoin) {
    dandercoin = _dandercoin;
  }

  function onTransfer(address, address, uint256) public override {
    require(msg.sender == address(dandercoin), "Hook is not sent from Dandercoin");
    counter++;
  }
}
