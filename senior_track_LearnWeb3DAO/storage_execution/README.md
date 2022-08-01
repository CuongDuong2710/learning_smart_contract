[Storage and Execution](https://www.learnweb3.io/tracks/senior/eth-data-storage-execution)

# Ethereum Storage and Execution

We have been writing smart contracts over the last few tracks, and briefly mentioned that Ethereum smart contracts run within this thing called the Ethereum Virtual Machine (EVM).

## Recap

Recall that Ethereum works as a transaction-based state machine. Starting at some state s1, a transaction manipulates certain data to shift the world state to some state s2.

![World State!](./assets/images/world_state.png "World State")

To group things together, transactions are packed together in blocks. Generally speaking, each block changes the world state from state s1 to s2, and the conversion is calculated based on the state changes made by every transaction within the block.
