#!/usr/bin/env bash

yarn workspace @dandercoin/core truffle run verify Migrations --network test
yarn workspace @dandercoin/core truffle run verify Dandercoin --network test
yarn workspace @dandercoin/core truffle run verify StringUtils --network test
yarn workspace @dandercoin/core truffle run verify IdentityOracle --network test
yarn workspace @dandercoin/core truffle run verify Distributor --network test
yarn workspace @dandercoin/core truffle run verify Timelock --network test
yarn workspace @dandercoin/core truffle run verify GovernorBravo --network test
