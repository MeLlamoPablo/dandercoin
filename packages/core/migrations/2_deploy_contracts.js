const BN = require('bn.js');

const Dandercoin = artifacts.require('Dandercoin');
const Distributor = artifacts.require('Distributor');
const Identity = artifacts.require('Identity');
const IdentityOracle = artifacts.require('IdentityOracle');
const MockHooked = artifacts.require('MockHooked');
const StringUtils = artifacts.require('StringUtils');

const INITIAL_SUPPLY = '50000000000000000000'; // 50 DANDER
const MAX_GLOBAL_INFLATION = '10000000000000000000'; // 10 DANDER

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(
    Dandercoin,
    new BN(INITIAL_SUPPLY, 10),
    new BN(MAX_GLOBAL_INFLATION, 10),
  );

  await deployer.deploy(Identity);
  await deployer.deploy(StringUtils);

  await deployer.link(Identity, IdentityOracle);
  await deployer.link(StringUtils, IdentityOracle);

  await deployer.deploy(IdentityOracle);

  if (network === 'development') {
    const identityOracle = await IdentityOracle.deployed();
    await identityOracle.setOperator(accounts[0]);
  }

  await deployer.deploy(
    Distributor,
    (await Dandercoin.deployed()).address,
    (await IdentityOracle.deployed()).address,
  );

  if (network === 'development') {
    await deployer.deploy(MockHooked, (await Dandercoin.deployed()).address);
  }
};
