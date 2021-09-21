import Accounts from 'web3-eth-accounts';

const accounts = new Accounts();

const { address, privateKey } = accounts.create();

console.log(JSON.stringify({ address, privateKey }));
