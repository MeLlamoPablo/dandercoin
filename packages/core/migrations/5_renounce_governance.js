/* eslint-disable no-console */
const GovernorBravo = artifacts.require('GovernorBravo');
const Timelock = artifacts.require('Timelock');

module.exports = async function (deployer, network, accounts) {
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
};
