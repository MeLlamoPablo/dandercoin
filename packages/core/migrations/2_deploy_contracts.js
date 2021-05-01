const BN = require('bn.js');

const Dandercoin = artifacts.require('Dandercoin');

const INITIAL_SUPPLY = '1000000000000000000'; // 1 DANDER
const MAX_GLOBAL_INFLATION = '10000000000000000000'; // 10 DANDER

module.exports = async function (deployer) {
  deployer.deploy(
    Dandercoin,
    new BN(INITIAL_SUPPLY, 10),
    new BN(MAX_GLOBAL_INFLATION, 10),
  );
};
