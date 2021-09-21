const BN = require('bn.js');

const { advanceTime } = require('./utils');

const Dandercoin = artifacts.require('Dandercoin');

module.exports = (accounts) =>
  describe('Throttled Minting', () => {
    const adminAccount = accounts[0];
    const receiverAccount = accounts[1];
    const mintLimit = new BN('50000000000000000000000', 10); // 50000 DANDER/year

    it('should allow minting within the limit', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('25000000000000000000000', 10); // 25000 DANDER

      const startingBalance = await dandercoin.balanceOf.call(receiverAccount);
      await dandercoin.mint(receiverAccount, amount, {
        from: adminAccount,
      });
      const endingBalance = await dandercoin.balanceOf.call(receiverAccount);

      assert.equal(
        endingBalance.sub(startingBalance).toString(),
        amount.toString(),
        'Mint was not performed successfully',
      );

      const remainingMintCapacity = await dandercoin.getRemainingMintCapacity();

      assert.equal(
        remainingMintCapacity.toString(),
        mintLimit.sub(amount).toString(),
        'Mint capacity was not consumed correctly',
      );

      // Return the minted coins for ease of testing
      await dandercoin.transfer(adminAccount, amount, {
        from: receiverAccount,
      });
    });

    it('should prevent minting above the limit', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('70000000000000000000000', 10); // 70000 DANDER

      let error;

      try {
        await dandercoin.mint(receiverAccount, amount, {
          from: adminAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });

    it('should allow minting when the limit replenishes', async () => {
      const lastBlock = await web3.eth.getBlock('latest');
      await advanceTime(
        web3,
        lastBlock.timestamp +
          365 /* days */ * 24 /* hours */ * 60 /* minutes */ * 60 /* seconds */,
      );

      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('48000000000000000000000', 10); // 480000 DANDER

      const startingBalance = await dandercoin.balanceOf.call(receiverAccount);
      await dandercoin.mint(receiverAccount, amount, {
        from: adminAccount,
      });
      const endingBalance = await dandercoin.balanceOf.call(receiverAccount);

      assert.equal(
        endingBalance.sub(startingBalance).toString(),
        amount.toString(),
        'Mint was not performed successfully',
      );

      // Return the minted coins for ease of testing
      await dandercoin.transfer(adminAccount, amount, {
        from: receiverAccount,
      });
    });

    it('should prevent minting higher than their limit, even if more than a year has passed', async () => {
      const lastBlock = await web3.eth.getBlock('latest');
      await advanceTime(
        web3,
        lastBlock.timestamp +
          5 /* years */ *
            365 /* days */ *
            24 /* hours */ *
            60 /* minutes */ *
            60 /* seconds */,
      );

      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('280000000000000000000000', 10); // 280000 DANDER

      let error;

      try {
        await dandercoin.mint(receiverAccount, amount, {
          from: adminAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });

    it('should prevent an account with no permissions from minting', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('10000000000000', 10); // 0.00001 DANDER

      let error;

      try {
        await dandercoin.mint(receiverAccount, amount, {
          from: receiverAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Insufficient permissions'),
          'Transaction succeeded when it should have failed',
        );
      }
    });
  });
