function advanceTime(web3, time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        id: Date.now(),
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [time],
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      },
    );
  });
}

async function operatorSign(
  identityOracle,
  operatorAccount,
  registeredAccount,
  registeredEmail,
  timestamp,
) {
  const msgParams = {
    domain: {
      chainId: 1337,
      name: 'Dandercoin IdentityOracle',
      verifyingContract: identityOracle.address,
      version: '1',
    },
    message: {
      account: registeredAccount,
      email: registeredEmail,
      timestamp,
    },
    primaryType: 'Identity',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Identity: [
        { name: 'account', type: 'address' },
        { name: 'email', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
      ],
    },
  };

  return await new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        method: 'eth_signTypedData',
        params: [operatorAccount, msgParams],
        from: operatorAccount,
      },
      (err, { result }) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      },
    );
  });
}

module.exports = { advanceTime, operatorSign };
