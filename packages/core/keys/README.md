# Deploy keys

This directory contains encrypted BIP39 mnemonic phrases used to derive the
private keys of the deployer accounts (using the `m/44'/60'/0'/0`
BIP44 derivation path).

The deployer accounts own the following:

1. The [`Migrations` contract](../contracts/Migrations.sol), which is used by
   the Truffle deployer.
2. The [`IdentityOracle` contract](../contracts/IdentityOracle.sol), which is
   used by the [`Distributor` contract](../contracts/IdentityOracle.sol) to
   perform the initial coin distribution.
3. Potentially some leftover Ether (MATIC) from the deployment.

It is important to protect the deployer account because if the IdentityOracle
is compromised, the attacker could choose a rogue operator and drain all funds.
This is not too problematic because we do the initial distribution just once,
and it is necessarily a centralized process. Still, it is wise to keep these
keys reasonably safe.

**These keys can't be used to access any distributed DANDER, nor do they have
control over any other piece of the Dandercoin ecosystem. Everything else there
is to own is owned by governance.**
