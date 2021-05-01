const HDWalletProvider = require('@truffle/hdwallet-provider');

const testnetMnemonic =
  'pony column wait rubber admit control father glance mango engage recall orange';

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
          providerOrUrl: 'https://rpc-mumbai.matic.today',
        }),
      gasPrice: 1000000000,
      network_id: 80001,
    },
  },
};
