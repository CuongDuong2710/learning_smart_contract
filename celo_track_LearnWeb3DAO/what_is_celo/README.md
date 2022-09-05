# [What is Celo?](https://learnweb3.io/courses/2204ab10-6a7b-44ec-9705-1a6682a4725f/lessons/3ce68dbc-4f22-4fe6-bd1b-1061c5814a88)

## Introduction

Celo is a Proof of Stake Layer-1 EVM compatible blockchain, optimized for DeFi, which is designed to be mobile-first and climate friendly. With it's mobile-first design, it aims to bring the benefits of DeFi to the 6 billion+ market of smartphones in the world.

Being fully EVM compatible, developers can port their Solidity dApps to Celo easily, just by changing the RPC URL during deployment.

Celo also uses `an ultralight client`, which utilizes `Zero-Knowledge proofs, to allow for syncing with the Celo blockchain extremely fast`. The ZKP allows for quick verification of the chain syncing computation, without having to sync the entire chain locally.

The Celo Blockchain and `Celo Core Contract`s (a set of smart contracts deployed by the Celo team) form together the `Celo Protocol`. Let's take a deeper look at what that implies.

🤔 What kind of a blockchain is Celo?

> layer 1

🤔 What consensus algorithm does Celo use?

> Proof of Stake

## Celo Protocol

### Consensus Algorithm

Celo uses a Proof of Stake consensus algorithm, which allows for cheap and fast transactions on the network. It is fault-tolerant upto 66%, i.e. it can handle upto 1/3rd of the network validators being malicious.

🤔 What does it mean for Celo's consensus algorithm to be fault tolerant upto 66%?

> Celo can handle 33% of it's network validators being malicous

### Stable Cryptocurrencies

Celo provides native support for a family of stablecoins that track the value of fiat currencies. Currently, it supports the Celo Dollar (cUSD) and the Celo Euro (cEUR).

The CELO token, and other assets like BTC and ETH, serve as collateral for these stablecoins. These stablecoins can easily be traded for the CELO token through Celo's own reserve contracts that `allow users to mint new cUSD and cEUR by sending CELO to the contract`, or to `burn cUSD and cEUR to redeem CELO tokens`.

🤔 cUSD and cEUR are backed by ETH?

> False

🤔 Celo supports stablecoins natively. Which one of the following is NOT supported?

> INR

🤔 You require the $CELO token to pay for transactions on the Celo network?

> False



