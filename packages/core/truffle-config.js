const { readFileSync } = require('fs');
const { join } = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

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
      networkCheckTimeout: 60000,
      provider: () =>
        new HDWalletProvider({
          mnemonic: readFileSync(
            join(__dirname, 'keys/staging.txt'),
            'utf-8',
          ).trim(),
          providerOrUrl:
            'https://polygon-mumbai.infura.io/v3/54d6cf2676ea4e8dab655d85bd3c9f4f',
        }),
      gasPrice: 1000000000,
      network_id: 80001,
    },
  },
};
