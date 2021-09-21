const Dandercoin = artifacts.require('Dandercoin');
const GovernorBravo = artifacts.require('GovernorBravo');
const Timelock = artifacts.require('Timelock');

const GOVERNANCE_PROPOSAL_THRESHOLD = '1000000000000000000000'; // 1000 DANDER
const GOVERNANCE_VOTING_PERIOD = 300;
const GOVERNANCE_VOTING_DELAY = 1; // Instant

module.exports = async function (deployer, network, accounts) {
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
};
