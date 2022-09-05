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

### On-Chain Governance

Unlike Ethereum, where on-chain upgrades happen through forking and community consensus on which fork to follow, Celo uses an on-chain governance mechanism for aspects of the protocol that reside in the Celo Core Contracts and for a number of parameters used by the Celo blockchain.

Proposals in the governance contract are selected and voted on by CELO token holders, and the governance contract can execute the relevant code if the proposal passes.

🤔 How do operators do decision making on Celo?

> Through on-chain governance

### Mobile-first Identity Layer

Celo offers a `lightweight identity layer` that `allows users to identify and securely transact with other users via their phone numbers`. Celo Wallet enables payments directly to users listed in the devices' contact list.

A user can request to link their phone number to their address through the `Attestations contract`. The contract uses a decentralized source of randomness through Oracles to pick a few validators who produce and send signed secret messages over SMS. The user then submits these back to the Attestations contract, and if successfully verified, adds a mapping from the phone number to the user's account.

🤔 Which core contract is used to link phone numbers to wallet addresses?

> Attestations Contract

### Rich Transactions

Firstly, the CELO token, while being the native token of the Celo blockchain, is also an ERC-20 token. This means `no more wrapped assets`! No more WETH like on Ethereum, because ETH does not behave as an ERC-20 token. This simplifies the life of application developers.

Secondly, as mentioned before, transaction fees on Celo can be paid using the stablecoins.

Thirdly, an Escrow contract allows users to send payments to phone numbers who don't yet have an account on the Celo blockchain. Payments are sent to the Escrow contract, and can be withdrawn by the intended recipient after they create an account and link their phone number to their address.



