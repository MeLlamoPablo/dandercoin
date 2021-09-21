const { operatorSign } = require('./utils');

const IdentityOracle = artifacts.require('IdentityOracle');

contract('IdentityOracle', (accounts) => {
  const adminAccount = accounts[0];
  const operatorAccount = accounts[1];

  it('should allow the admin to set the operator account', async () => {
    const identityOracle = await IdentityOracle.deployed();

    await identityOracle.setOperator(operatorAccount, {
      from: adminAccount,
    });

    assert.equal(
      operatorAccount,
      await identityOracle.getOperator(),
      "The operator wasn't correctly set",
    );
  });

  it('should prevent an unprivileged user from setting the operator', async () => {
    const identityOracle = await IdentityOracle.deployed();

    let error;

    try {
      await identityOracle.setOperator(operatorAccount, {
        from: operatorAccount,
      });
    } catch (e) {
      error = e;
    } finally {
      assert.ok(
        error?.message.includes('Caller is not an admin'),
        'Transaction succeeded when it should have failed',
      );
    }
  });

  it('should register an identity with a valid signature by the operator', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const registeredAccount = '0x1111111111111111111111111111111111111111';
    const registeredEmail = 'foo@danderco.in';
    const timestamp = lastBlock.timestamp;

    const signature = await operatorSign(
      identityOracle,
      operatorAccount,
      registeredAccount,
      registeredEmail,
      timestamp,
    );

    await identityOracle.registerIdentity(
      registeredAccount,
      registeredEmail,
      timestamp,
      signature,
      {
        from: adminAccount,
      },
    );

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      registeredAccount,
      "The identity account wasn't correctly registered",
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      registeredEmail,
      "The identity email wasn't correctly registered",
    );

    assert.deepEqual(
      normalizeAccountPage(await identityOracle.getAccounts.call(1, 10)),
      [
        {
          account: registeredAccount,
          email: registeredEmail,
        },
      ],
      "The identity email wasn't correctly saved to the list of all identities",
    );
  });

  it('should update the account of a registered email and remove the association from the old email', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const oldAccount = '0x1111111111111111111111111111111111111111';
    const registeredAccount = '0x2222222222222222222222222222222222222222';
    const registeredEmail = 'foo@danderco.in';
    const timestamp = lastBlock.timestamp;

    const signature = await operatorSign(
      identityOracle,
      operatorAccount,
      registeredAccount,
      registeredEmail,
      timestamp,
    );

    await identityOracle.registerIdentity(
      registeredAccount,
      registeredEmail,
      timestamp,
      signature,
      {
        from: adminAccount,
      },
    );

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      registeredAccount,
      "The identity account wasn't correctly registered",
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      registeredEmail,
      "The identity email wasn't correctly registered",
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(oldAccount),
      '',
      "The old account association wasn't correctly deleted",
    );

    assert.deepEqual(
      normalizeAccountPage(await identityOracle.getAccounts.call(1, 10)),
      [
        {
          account: registeredAccount,
          email: registeredEmail,
        },
      ],
      "The identity account wasn't correctly saved to the list of all identities",
    );
  });

  it('should update the email of a registered account and remove the association from the old account', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const registeredAccount = '0x2222222222222222222222222222222222222222';
    const oldEmail = 'foo@danderco.in';
    const registeredEmail = 'bar@danderco.in';
    const timestamp = lastBlock.timestamp;

    const signature = await operatorSign(
      identityOracle,
      operatorAccount,
      registeredAccount,
      registeredEmail,
      timestamp,
    );

    await identityOracle.registerIdentity(
      registeredAccount,
      registeredEmail,
      timestamp,
      signature,
      {
        from: adminAccount,
      },
    );

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      registeredAccount,
      "The identity account wasn't correctly registered",
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      registeredEmail,
      "The identity email wasn't correctly registered",
    );

    assert.equal(
      await identityOracle.getAccountByEmail.call(oldEmail),
      '0x0000000000000000000000000000000000000000',
      "The old email association wasn't correctly deleted",
    );

    assert.deepEqual(
      normalizeAccountPage(await identityOracle.getAccounts.call(1, 10)),
      [
        {
          account: registeredAccount,
          email: registeredEmail,
        },
      ],
      "The identity email wasn't correctly saved to the list of all identities",
    );
  });

  it('should allow deleting an identity', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const registeredAccount = '0x2222222222222222222222222222222222222222';
    const registeredEmail = 'bar@danderco.in';
    const timestamp = lastBlock.timestamp;

    /*
     * In order to delete an identity we first update the current email to
     * the empty address...
     */

    const deleteAccountSig = await operatorSign(
      identityOracle,
      operatorAccount,
      '0x0000000000000000000000000000000000000000',
      registeredEmail,
      timestamp,
    );

    await identityOracle.registerIdentity(
      '0x0000000000000000000000000000000000000000',
      registeredEmail,
      timestamp,
      deleteAccountSig,
      {
        from: adminAccount,
      },
    );

    /*
     * And then update the current address to the empty email.
     */

    const deleteEmailSig = await operatorSign(
      identityOracle,
      operatorAccount,
      registeredAccount,
      '',
      timestamp,
    );

    await identityOracle.registerIdentity(
      registeredAccount,
      '',
      timestamp,
      deleteEmailSig,
      {
        from: adminAccount,
      },
    );

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      '0x0000000000000000000000000000000000000000',
      "The identity account wasn't correctly deleted",
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      '',
      "The identity email wasn't correctly deleted",
    );

    assert.deepEqual(
      normalizeAccountPage(await identityOracle.getAccounts.call(1, 10)),
      [],
      "The identity wasn't correctly deleted from the list of all identities",
    );
  });

  it('should reject an identity with a valid but expired signature', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const registeredAccount = '0x2222222222222222222222222222222222222222';
    const registeredEmail = 'bar@danderco.in';
    const timestamp = lastBlock.timestamp - 2 * 60 * 60;

    const signature = await operatorSign(
      identityOracle,
      operatorAccount,
      registeredAccount,
      registeredEmail,
      timestamp,
    );

    let error;

    try {
      await identityOracle.registerIdentity(
        registeredAccount,
        registeredEmail,
        timestamp,
        signature,
        {
          from: adminAccount,
        },
      );
    } catch (e) {
      error = e;
    } finally {
      assert.ok(
        error?.message.includes('Identity signature has expired'),
        'Transaction succeeded when it should have failed',
      );
    }

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      '0x0000000000000000000000000000000000000000',
      'The identity account was incorrectly registered',
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      '',
      'The identity email was incorrectly registered',
    );
  });

  it('should reject an identity with a signature not from the operator', async () => {
    const identityOracle = await IdentityOracle.deployed();
    const lastBlock = await web3.eth.getBlock('latest');

    const registeredAccount = '0x3333333333333333333333333333333333333333';
    const registeredEmail = 'attacker@danderco.in';
    const timestamp = lastBlock.timestamp;

    const signature = await operatorSign(
      identityOracle,
      adminAccount, // Not the operator!
      registeredAccount,
      registeredEmail,
      timestamp,
    );

    let error;

    try {
      await identityOracle.registerIdentity(
        registeredAccount,
        registeredEmail,
        timestamp,
        signature,
        {
          from: adminAccount,
        },
      );
    } catch (e) {
      error = e;
    } finally {
      assert.ok(
        error?.message.includes('Invalid operator signature'),
        'Transaction succeeded when it should have failed',
      );
    }

    assert.equal(
      await identityOracle.getAccountByEmail.call(registeredEmail),
      '0x0000000000000000000000000000000000000000',
      'The identity account was incorrectly registered',
    );

    assert.equal(
      await identityOracle.getEmailByAccount.call(registeredAccount),
      '',
      "The identity email wasn't correctly registered",
    );
  });
});

function normalizeAccountPage(page) {
  return (
    page
      .filter(
        ({ account, email }) =>
          account !== '0x0000000000000000000000000000000000000000' || !!email,
      )
      // Remove extra props
      .map(({ account, email }) => ({ account, email }))
  );
}
