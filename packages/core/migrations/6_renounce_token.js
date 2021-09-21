/* eslint-disable no-console */
const Dandercoin = artifacts.require('Dandercoin');
const Timelock = artifacts.require('Timelock');

module.exports = async function (deployer, network, accounts) {
  console.log('Renouncing ownership of Dandercoin token...');

  const dandercoin = await Dandercoin.deployed();
  const defaultAdminRole = await dandercoin.DEFAULT_ADMIN_ROLE();

  const newOwner = (await Timelock.deployed()).address;
  await dandercoin.grantRole(defaultAdminRole, newOwner);

  if (network !== 'development') {
    await dandercoin.revokeRole(defaultAdminRole, accounts[0]);
  }
};
