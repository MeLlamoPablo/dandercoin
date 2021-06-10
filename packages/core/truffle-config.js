const HDWalletProvider = require('@truffle/hdwallet-provider');

const testnetMnemonic =
  'oppose fortune truck cross crouch lens twist device flight doctor immense setup';

module.exports = {
  compilers: {
    solc: {
      version: 'native',
    },
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    test: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: testnetMnemonic,
          providerOrUrl: 'https://rpc-mumbai.maticvigil.com',
        }),
      gasPrice: 1000000000,
      network_id: 80001,
    },
  },
};
