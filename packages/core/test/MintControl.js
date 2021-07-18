const BN = require('bn.js');

const { advanceTime } = require('./utils');

const Dandercoin = artifacts.require('Dandercoin');

module.exports = (accounts) =>
  describe('Throttled Minting', () => {
    const adminAccount = accounts[0];
    const minterAccount = accounts[1];
    const receiverAccount = accounts[2];
    const mintLimit = new BN('2000000000000000000', 10); // 2 DANDER/year

    it('should allow the admin account to authorize the minter account', async () => {
      const dandercoin = await Dandercoin.deployed();

      await dandercoin.authorizeMinter(minterAccount, mintLimit);
      const setLimit = await dandercoin.yearlyMintLimitOf.call(minterAccount);

      assert.equal(
        setLimit.toString(),
        mintLimit.toString(),
        'Mint limit was not set successfully',
      );
    });

    it('should allow the minter account account to mint within the limit', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('500000000000000000', 10); // 0.5 DANDER

      const startingBalance = await dandercoin.balanceOf.call(receiverAccount);
      await dandercoin.mint(receiverAccount, amount, {
        from: minterAccount,
      });
      const endingBalance = await dandercoin.balanceOf.call(receiverAccount);

      assert.equal(
        endingBalance.sub(startingBalance).toString(),
        amount.toString(),
        'Mint was not performed successfully',
      );

      const remainingMintCapacity = await dandercoin.remainingMintCapacityOf.call(
        minterAccount,
      );

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

    it('should prevent the minter account account from minting above the limit', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('1800000000000000000', 10); // 1.8 DANDER

      let error;

      try {
        await dandercoin.mint(receiverAccount, amount, {
          from: minterAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Local mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });

    it('should allow the minter account to mint when the limit replenishes', async () => {
      const lastBlock = await web3.eth.getBlock('latest');
      await advanceTime(
        web3,
        lastBlock.timestamp +
          365 /* days */ * 24 /* hours */ * 60 /* minutes */ * 60 /* seconds */,
      );

      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('1800000000000000000', 10); // 1.8 DANDER

      const startingBalance = await dandercoin.balanceOf.call(receiverAccount);
      await dandercoin.mint(receiverAccount, amount, {
        from: minterAccount,
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

    it('should prevent the minter account from minting higher than their limit, even if more than a year has passed', async () => {
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
      const amount = new BN('2800000000000000000', 10); // 2.8 DANDER

      let error;

      try {
        await dandercoin.mint(receiverAccount, amount, {
          from: minterAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Local mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });

    it('should prevent the minter account from minting higher than the global limit', async () => {
      const dandercoin = await Dandercoin.deployed();

      const newLimit = new BN('200000000000000000000000', 10); // 200000 DANDER/year
      await dandercoin.authorizeMinter(minterAccount, newLimit);

      const amount = new BN('150000000000000000000000', 10); // 150000 DANDER

      let error;

      try {
        await dandercoin.mint(minterAccount, amount, {
          from: minterAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Global mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });

    it('should allow the admin account to revoke the minter account', async () => {
      const dandercoin = await Dandercoin.deployed();

      const newLimit = new BN('0', 10); // 0 DANDER/year
      await dandercoin.authorizeMinter(minterAccount, newLimit);
      const setLimit = await dandercoin.yearlyMintLimitOf(minterAccount);

      assert.equal(
        setLimit.toString(),
        newLimit.toString(),
        'Mint limit was not set successfully',
      );
    });

    it('should prevent an account with no permissions from minting', async () => {
      const dandercoin = await Dandercoin.deployed();
      const amount = new BN('10000000000000', 10); // 0.00001 DANDER

      let error;

      try {
        await dandercoin.mint(minterAccount, amount, {
          from: minterAccount,
        });
      } catch (e) {
        error = e;
      } finally {
        assert.ok(
          error?.message.includes('Local mint capacity exceeded'),
          'Transaction succeeded when it should have failed',
        );
      }
    });
  });
