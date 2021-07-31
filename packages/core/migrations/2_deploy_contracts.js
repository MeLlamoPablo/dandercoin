/* eslint-disable no-console */
const BN = require('bn.js');

const Dandercoin = artifacts.require('Dandercoin');
const Distributor = artifacts.require('Distributor');
const GovernorBravo = artifacts.require('GovernorBravo');
const Identity = artifacts.require('Identity');
const IdentityOracle = artifacts.require('IdentityOracle');
const StringUtils = artifacts.require('StringUtils');
const Timelock = artifacts.require('Timelock');

const GOVERNANCE_PROPOSAL_THRESHOLD = '1000000000000000000000'; // 1000 DANDER
const GOVERNANCE_VOTING_PERIOD = 300;
const GOVERNANCE_VOTING_DELAY = 1; // Instant
const INITIAL_SUPPLY = '50000000000000000000000'; // 50000 DANDER
const MAX_GLOBAL_INFLATION = '100000000000000000000000'; // 100000 DANDER

async function deployToken(deployer, network, accounts) {
  await deployer.deploy(
    Dandercoin,
    new BN(INITIAL_SUPPLY, 10),
    new BN(MAX_GLOBAL_INFLATION, 10),
  );

  const transferOwnershipTo = async (newOwner) => {
    console.log('Renouncing ownership of Dandercoin token...');

    const dandercoin = await Dandercoin.deployed();
    const defaultAdminRole = await dandercoin.DEFAULT_ADMIN_ROLE();

    await dandercoin.grantRole(defaultAdminRole, newOwner);

    if (network !== 'development') {
      await dandercoin.revokeRole(defaultAdminRole, accounts[0]);
    }
  };

  return { transferOwnershipTo };
}

async function deployDistribution(deployer, network, accounts) {
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
}

async function deployGovernance(deployer, network, accounts) {
  // The temp admin account will temporarily hold ownership of the contracts,
  // then it will transfer ownership to them (i.e: Timelock owns Governor and
  // Governor owns Timelock).
  const tempAdmin = accounts[0];

  await deployer.deploy(
    Timelock,
    tempAdmin,
    // Instant delay, for ease of deployment. A proper timelock delay must
    // be activated through governance.
    1,
  );

  await deployer.deploy(
    GovernorBravo,
    (await Timelock.deployed()).address,
    (await Dandercoin.deployed()).address,
    GOVERNANCE_VOTING_PERIOD,
    GOVERNANCE_VOTING_DELAY,
    GOVERNANCE_PROPOSAL_THRESHOLD,
  );

  const governor = await GovernorBravo.deployed();
  const timelock = await Timelock.deployed();

  async function runTimelocked(
    address,
    functionName,
    parameterTypes,
    parameters,
  ) {
    // Wait a bit so that we don't create a race condition if our tx is
    // queued after the eta (which would cause the queuing to revert).
    const waitingTime = (() => {
      if (network === 'development') {
        return 3;
      }

      return 60;
    })();
    const eta = Math.floor(Date.now() / 1000) + waitingTime;

    const signature = `${functionName}(${parameterTypes.join(',')})`;

    await timelock.queueTransaction(
      address,
      0,
      signature,
      web3.eth.abi.encodeParameters(parameterTypes, parameters),
      eta,
    );

    await new Promise((r) => setTimeout(r, waitingTime * 1000));

    await timelock.executeTransaction(
      address,
      0,
      signature,
      web3.eth.abi.encodeParameters(parameterTypes, parameters),
      eta,
    );
  }

  /*
   * ==========================================
   * Transfer ownership of Governor to Timelock
   * ==========================================
   */

  console.log('Renouncing ownership of Governor...');

  // We have to talk to the GovernorBravoDelegate through the
  // GovernorBravoDelegator so we can't use the standard web3 methods which
  // rely on the ABI.
  await governor._setPendingAdmin(timelock.address);

  await runTimelocked(governor.address, '_acceptAdmin', [], []);

  /*
   * ==========================================
   * Transfer ownership of Timelock to Governor
   * ==========================================
   */

  console.log('Renouncing ownership of Timelock...');

  await runTimelocked(
    timelock.address,
    'setPendingAdmin',
    ['address'],
    [governor.address],
  );

  await runTimelocked(governor.address, '_initiate', [], []);

  /*
   * At this point, the governance module is completely deployed and its
   * ownership is renounced. Any further modifications to either the Timelock
   * or the Governor implementation must be executed by the Timelock only,
   * which requires an executive proposal to pass.
   *
   * However, the Dandercoin protocol can't be considered decentralized yet
   * because all DANDER tokens are still in the hands of the 'accounts[0]' EOA.
   * A successful token distribution is required to truly renounce ownership.
   *
   * Also, for convenience in the deployment process, the timelock is not
   * active yet (the delay is set to one block). It must be activated trough
   * an executive proposal.
   */
}

module.exports = async function (deployer, network, accounts) {
  const { transferOwnershipTo } = await deployToken(
    deployer,
    network,
    accounts,
  );
  await deployDistribution(deployer, network, accounts);
  await deployGovernance(deployer, network, accounts);

  await transferOwnershipTo((await Timelock.deployed()).address);
};
