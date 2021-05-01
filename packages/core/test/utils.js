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

module.exports = { advanceTime };
