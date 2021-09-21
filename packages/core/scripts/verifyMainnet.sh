#!/usr/bin/env bash

yarn workspace @dandercoin/core truffle run verify Migrations --network mainnet
yarn workspace @dandercoin/core truffle run verify Dandercoin --network mainnet
yarn workspace @dandercoin/core truffle run verify StringUtils --network mainnet
yarn workspace @dandercoin/core truffle run verify IdentityOracle --network mainnet
yarn workspace @dandercoin/core truffle run verify Distributor --network mainnet
yarn workspace @dandercoin/core truffle run verify Timelock --network mainnet
yarn workspace @dandercoin/core truffle run verify GovernorBravo --network mainnet
