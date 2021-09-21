const Dandercoin = artifacts.require('Dandercoin');
const Distributor = artifacts.require('Distributor');
const IdentityOracle = artifacts.require('IdentityOracle');
const StringUtils = artifacts.require('StringUtils');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(StringUtils);

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
};
