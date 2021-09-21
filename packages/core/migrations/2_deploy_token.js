const BN = require('bn.js');

const Dandercoin = artifacts.require('Dandercoin');

const INITIAL_SUPPLY = '87639000000000000000000'; // 87639 DANDER
const MAX_GLOBAL_INFLATION = '50000000000000000000000'; // 50000 DANDER

module.exports = async function (deployer) {
  await deployer.deploy(
    Dandercoin,
    new BN(INITIAL_SUPPLY, 10),
    new BN(MAX_GLOBAL_INFLATION, 10),
  );
};
