const BN = require('bn.js');

const Dandercoin = artifacts.require('Dandercoin');
const MockHooked = artifacts.require('MockHooked');

module.exports = (accounts) =>
  describe('Dandercoin Hooks', () => {
    const adminAccount = accounts[0];
    const unprivilegedAccount = accounts[1];

    it('should prevent an unprivileged account from installing a hook', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      let error;

      try {
        await dandercoin.installHook(mockHooked.address, {
          from: unprivilegedAccount,
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

    it('should not send hooks if not installed', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      const amount = new BN('2000000000000000', 10); // 0.002 DANDER
      await dandercoin.transfer(unprivilegedAccount, amount, {
        from: adminAccount,
      });

      assert.equal(
        await mockHooked.counter(),
        0,
        "Hooks were sent when they shouldn't",
      );
    });

    it('should allow the admin to install a hook', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      await dandercoin.installHook(mockHooked.address, {
        from: adminAccount,
      });
    });

    it('should send hooks after registered', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      const amount = new BN('2000000000000000', 10); // 0.002 DANDER
      await dandercoin.transfer(unprivilegedAccount, amount, {
        from: adminAccount,
      });

      assert.equal(
        await mockHooked.counter(),
        1,
        "Hooks were sent when they shouldn't",
      );
    });

    it('should prevent an unprivileged account from uninstalling a hook', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      let error;

      try {
        await dandercoin.uninstallHook(mockHooked.address, {
          from: unprivilegedAccount,
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

    it('should allow the admin to uninstall a hook', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      await dandercoin.uninstallHook(mockHooked.address, {
        from: adminAccount,
      });
    });

    it('should not send hooks after uninstall', async () => {
      const dandercoin = await Dandercoin.deployed();
      const mockHooked = await MockHooked.deployed();

      const amount = new BN('2000000000000000', 10); // 0.002 DANDER
      await dandercoin.transfer(unprivilegedAccount, amount, {
        from: adminAccount,
      });

      assert.equal(
        await mockHooked.counter(),
        1,
        "Hooks were sent when they shouldn't",
      );
    });
  });
