# How to deploy the Dandercoin contracts

Dandercoin can be deployed to any EVM-compatible network. This guide assumes
that one has already set up their local development environment. If not, refer
to the README.

This guide will simulate how to deploy to a network (or environment) called
"example".

## 1. Set up the deployer account and the network information

Add a key to `packages/core/keys` named `example.txt` containing the mnemonic
phrase of the deployer account. **Please do not use an existing account as the
deployer**. You can use [this tool](https://iancoleman.io/bip39/) to generate
mnemonic phrases. The first address derived from this mnemonic will be used.

Set up the new network on `packages/core/truffle-config.js` and use your newly
added mnemonic.

## 2. Deploy the contracts

The script to deploy to testnet is

```
docker-compose exec core yarn workspace @dandercoin/core migrate:testnet
```

Add a new script for your network and run it. Ensure that you have enough gas
(it should cost ~0.01 ETH at 1 gwei).

## 3. Verify the contracts

The script to verify on testnet is

```
docker-compose exec core yarn workspace @dandercoin/core verify:testnet
```

Add a new script for your network and run it. You might need to add an API key
for the blockchain explorer to `packages/core/truffle-config.js`.

## 4. Update the infrastructure

Add the necessary information to `infra/environments`. Managing the cloud
infrastructure is out of scope for this tutorial, check the documentation
there.

## 5. Set the Identity Oracle operator

`terraform show` should output the identity oracle operator address. This is
not an actual EOA that will interact with the network, it will only sign
messages.

We need to save the operator address to the Identity Oracle so that it can
accept identities signed by it.

To do so, go to the IdentityOracle contract page on Polygonscan (or similar)
and go to "Contract > Write Contract". Load the deployer mnemonic on Metamask
and connect Metamask to Polygonscan.

Call the `setOperator` method and send the transaction.

## 6. Set the initial governance parameters

During the deployment, some transactions have to run through the Timelock. In
order for deployments to be automatic, the Timelock is initially deployed with
a "delay" value of one second (which makes it pointless), otherwise the
migrations would take days.

Once the ownership of the Timelock is renounced, the only way to update the
delay value is through governance. In order to make that easy, the initial
voting period of the governor contract is also set to a low value.

Therefore, in order to have a functional and secure governance system, a first
proposal which sets reasonable values must be passed. The following values are
recommended:

* `Timelock`'s `delay` to `86400` seconds, 24 hours.
* `GovernorBravo`'s `votingDelay` to `43200` blocks, 24 hours for 2 seconds block time.
* `GovernorBravo`'s `votingPeriod` to `86400` blocks, 48 hours for 2 seconds block time.

## 7. Distribute the tokens

Update the information in `packages/core/scripts/initialDistribution.csv` and
run:

```
docker-compose exec core yarn workspace @dandercoin/core initial-distribution
```

This will output the necessary information to send the tokens to the
Distributor. You should see something like this:

```
This is the newGrantees parameter:
[["1000000000000000000000","0x09d6e4d5dd536dd80900cc06f22e779833a81361f289b10f10c949aa8d0fcae7"],["500000000000000000000","0x68c8fb20a227422ec6839364a0a9574ad491266abd75aa81be5391db8f8f9b8a"]]

Total DANDER: 1500 DANDER (1500000000000000000000 DANDERwei)
```

First, go to the Dandercoin contract, then "Contract > Write Contract" and
send an `increaseAllowance` transaction with the "DANDERwei" amount shown by
the script. Next, go to the Distributor contract, then again "Contract >
Write Contract", then send a `grant` transaction with the `newGrantees` shown
by the script.
