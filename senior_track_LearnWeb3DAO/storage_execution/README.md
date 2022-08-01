[Storage and Execution](https://www.learnweb3.io/tracks/senior/eth-data-storage-execution)

# Ethereum Storage and Execution

We have been writing smart contracts over the last few tracks, and briefly mentioned that Ethereum smart contracts run within this thing called the Ethereum Virtual Machine (EVM).

## Recap

Recall that Ethereum works as a transaction-based state machine. Starting at some state s1, a transaction manipulates certain data to shift the world state to some state s2.

![World State!](./assets/images/world_state.png "World State")

To group things together, transactions are packed together in blocks. Generally speaking, each block changes the world state from state s1 to s2, and the conversion is calculated based on the state changes made by every transaction within the block.

When we think of these state changes, Ethereum can be thought of as a state chain.

![World State Change!](./assets/images/world_state_change.png "World State Change")

But, what is this world state? 🤨

## World state

The World State in Ethereum is a mapping between addresses and account states. Each address on Ethereum has it's own state, this could be a user account (EOA - Externally owned accounts) or a smart contract.

![EOA or Smart Contract!](./assets/images/world_state_EOA_or_smart_contract.png "EOA or Smart Contract")

Each block essentially manipulates multiple account states, thereby manipulating the overall world state of Ethereum.

## Account State

Alright, so the world state is comprised of various account states. What is an account state?

![Account State!](./assets/images/account_state.png "Account State")

The account state contains a few common things, like the nonce and the balance (in ETH). Additionally, smart contracts also contain a storage hash and a code hash. The two hashes act as references to a separate state tree, which store state variables and the bytecode of the smart contract respectively.

![EOA or Smart Contract 2!](./assets/images/world_state_EOA_or_smart_contract_2.png "EOA or Smart Contract 2")

Recall that there are two types of accounts in Ethereum. Externally owned accounts (e.g. Coinbase Wallets, Metamask Wallets, etc.) and Smart Contract Accounts.

EOA's are controlled by private keys, and do not have any EVM code. Contract accounts on the other hand contain EVM code and are controlled by the code itself, and do not have private keys associated with them.