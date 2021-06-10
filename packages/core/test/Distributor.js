const BN = require('bn.js');

const { operatorSign } = require('./utils');

const Dandercoin = artifacts.require('Dandercoin');
const Distributor = artifacts.require('Distributor');
const IdentityOracle = artifacts.require('IdentityOracle');

contract('Distributor', (accounts) => {
  const adminAccount = accounts[0];

  it('should initially have no DANDER', async () => {
    const distributor = await Distributor.deployed();

    assert.equal(
      0,
      await distributor.getUnclaimedBalance(),
      'The Distributor actually had DANDER',
    );
  });

  it('should allow sending grants', async () => {
    const dandercoin = await Dandercoin.deployed();
    const distributor = await Distributor.deployed();

    const amount = '3000000000000000000'; // 3 DANDER

    await dandercoin.increaseAllowance(
      distributor.address,
      new BN(amount, 10),
      {
        from: adminAccount,
      },
    );

    await distributor.grant(
      [
        {
          balance: '2000000000000000000', // 2 DANDER
          emailHash: web3.utils.keccak256('foo@danderco.in'),
        },
        {
          balance: '1000000000000000000', // 1 DANDER
          emailHash: web3.utils.keccak256('bar@danderco.in'),
        },
      ],
      {
        from: adminAccount,
      },
    );

    assert.equal(
      amount,
      (await distributor.getUnclaimedBalance()).toString(),
      "The Distributor didn't get the DANDER",
    );

    assert.equal(
      '2000000000000000000', // 2 DANDER
      (
        await distributor.getClaimableBalanceByEmail(
          web3.utils.keccak256('foo@danderco.in'),
        )
      ).toString(),
      "The foo account wasn't assigned their DANDER correctly",
    );

    assert.equal(
      '1000000000000000000', // 1 DANDER
      (
        await distributor.getClaimableBalanceByEmail(
          web3.utils.keccak256('bar@danderco.in'),
        )
      ).toString(),
      "The bar account wasn't assigned their DANDER correctly",
    );

    assert.equal(
      '0',
      (
        await distributor.getClaimableBalanceByEmail(
          web3.utils.keccak256('no-one@danderco.in'),
        )
      ).toString(),
      'Some random account got assigned DANDER!',
    );
  });

  it("should prevent sending grants if the sender doesn't have enough coins", async () => {
    const dandercoin = await Dandercoin.deployed();
    const distributor = await Distributor.deployed();

    const amount = '3000000000000000000000'; // 3000 DANDER

    await dandercoin.increaseAllowance(
      distributor.address,
      new BN(amount, 10),
      {
        from: adminAccount,
      },
    );

    let error;

    try {
      await distributor.grant(
        [
          {
            balance: amount,
            emailHash: web3.utils.keccak256('biz@danderco.in'),
          },
        ],
        {
          from: adminAccount,
        },
      );
    } catch (e) {
      error = e;
    } finally {
      assert.ok(
        error?.message.includes('ERC20: transfer amount exceeds balance'),
        'Transaction succeeded when it should have failed',
      );
    }

    // Cleanup
    await dandercoin.decreaseAllowance(
      distributor.address,
      new BN(amount, 10),
      {
        from: adminAccount,
      },
    );
  });

  it('should allow claiming grants', async () => {
    const dandercoin = await Dandercoin.deployed();
    const distributor = await Distributor.deployed();
    const identityOracle = await IdentityOracle.deployed();

    await identityOracle.setOperator(adminAccount, {
      from: adminAccount,
    });

    const lastBlock = await web3.eth.getBlock('latest');
    const claimantAccount = '0x1111111111111111111111111111111111111111';
    const claimantEmail = 'foo@danderco.in';
    const timestamp = lastBlock.timestamp;

    await identityOracle.registerIdentity(
      claimantAccount,
      claimantEmail,
      timestamp,
      await operatorSign(
        identityOracle,
        adminAccount,
        claimantAccount,
        claimantEmail,
        timestamp,
      ),
      {
        from: adminAccount,
      },
    );

    const prevUnclaimedBalance = await distributor.getUnclaimedBalance();

    await distributor.claimFor(claimantAccount, {
      from: adminAccount,
    });

    const nextUnclaimedBalance = await distributor.getUnclaimedBalance();

    assert.equal(
      prevUnclaimedBalance.sub(new BN('2000000000000000000', 10)), // prev - 2 DANDER
      nextUnclaimedBalance.toString(),
      "The Distributor didn't send any tokens",
    );

    assert.equal(
      '2000000000000000000', // 2 DANDER,
      (await dandercoin.balanceOf(claimantAccount)).toString(),
      "The claimant didn't receive any DANDER",
    );

    assert.equal(
      '0',
      (
        await distributor.getClaimableBalanceByEmail(
          web3.utils.keccak256('foo@danderco.in'),
        )
      ).toString(),
      "The claimant's claimable balance didn't get depleted",
    );

    // Cleanup
    await identityOracle.registerIdentity(
      '0x0000000000000000000000000000000000000000',
      claimantEmail,
      timestamp,
      await operatorSign(
        identityOracle,
        adminAccount,
        '0x0000000000000000000000000000000000000000',
        claimantEmail,
        timestamp,
      ),
      {
        from: adminAccount,
      },
    );

    await identityOracle.setOperator(
      '0x0000000000000000000000000000000000000000',
      {
        from: adminAccount,
      },
    );
  });

  it('should prevent claiming grants if no unclaimed balance is left', async () => {
    const distributor = await Distributor.deployed();

    let error;

    try {
      await distributor.claimFor('0x0000000000000000000000000000000000000000', {
        from: adminAccount,
      });
    } catch (e) {
      error = e;
    } finally {
      assert.ok(
        error?.message.includes(
          "This account doesn't have any claimable balance!",
        ),
        'Transaction succeeded when it should have failed',
      );
    }
  });
});
