// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

interface IERC20Hooked {
  function onTransfer(address from, address to, uint256 value) external;
}
