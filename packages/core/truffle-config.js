const HDWalletProvider = require('@truffle/hdwallet-provider');

const testnetMnemonic =
  'alcohol tongue theme boss noble another bless picnic fire assist prevent sweet';

module.exports = {
  compilers: {
    solc: {
      version: 'native',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
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
