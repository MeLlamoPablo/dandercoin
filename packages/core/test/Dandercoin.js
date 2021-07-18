const BN = require('bn.js');

const MintControl = require('./MintControl');

const Dandercoin = artifacts.require('Dandercoin');

contract('Dandercoin', (accounts) => {
  it('should transfer coins successfully', async () => {
    const dandercoin = await Dandercoin.deployed();

    const senderAccount = accounts[0];
    const receiverAccount = accounts[1];

    const senderStartingBalance = await dandercoin.balanceOf.call(
      senderAccount,
    );
    const receiverStartingBalance = await dandercoin.balanceOf.call(
      receiverAccount,
    );

    const amount = new BN('2000000000000000', 10); // 0.002 DANDER
    await dandercoin.transfer(receiverAccount, amount, { from: senderAccount });

    const senderEndingBalance = await dandercoin.balanceOf.call(senderAccount);
    const receiverEndingBalance = await dandercoin.balanceOf.call(
      receiverAccount,
    );

    assert.equal(
      senderEndingBalance.toString(),
      senderStartingBalance.sub(amount).toString(),
      "Amount wasn't correctly taken from the sender",
    );

    assert.equal(
      receiverEndingBalance.toString(),
      receiverStartingBalance.add(amount).toString(),
      "Amount wasn't correctly sent to the receiver",
    );

    // Return the coins as during testing we only want the coins to remain at
    // accounts[0].
    await dandercoin.transfer(senderAccount, amount, { from: receiverAccount });
  });

  it('should have made the deployer admin', async () => {
    const dandercoin = await Dandercoin.deployed();

    const adminAccount = accounts[0];
    const adminRole = await dandercoin.DEFAULT_ADMIN_ROLE.call();

    assert.equal(
      await dandercoin.hasRole.call(adminRole, adminAccount),
      true,
      "Admin account wasn't actually an admin",
    );
  });

  MintControl(accounts);
});
