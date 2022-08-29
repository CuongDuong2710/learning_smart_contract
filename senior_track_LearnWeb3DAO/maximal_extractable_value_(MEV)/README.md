# [Maximal Extractable Value](https://learnweb3.io/courses/c446d19f-a25d-42c6-b3e4-4311c5040587/lessons/b3dbf8e4-f774-46c7-ae7f-72c5e75374bc)

MEV is a relatively new concept in the world of blockchains, and one that carries with it a lot of controversy. It refers to the maximum value that can be extracted from the block production apart from the standard block rewards.

Previously, it used to be called Miner Extractable Value, since miners were best positioned to extract value from block production, but as we move towards Proof of Stake and miners get replaced by validators, a more generic rename has been done to call it Maximal Extractable Value.

🤔 What does MEV stand for?

> Maximal Extractable Value
## What is MEV?

In a nutshell, it's the concept of extracting value (profit) by making certain types of transactions on chain that are not block rewards themselves. Originally, it started happening because miners had control over which transactions they'd like to include in a block, and in which order. Note that we are talking about miners right now but things will change after [the merge](https://ethereum.org/en/upgrades/merge/).

## MEV Extraction

In theory, MEV could only be extracted by miners, and this was true in the early days. Today, however, a large portion of MEV is extracted by independent network participants referred to as `Searchers`. 

🤔 What makes MEV possible?

> Miners can choose which transactions to include in a block in which order

## Searchers

`Searchers` are participants which are looking for opportunities to make profitable transactions. These are generally regular users, who can code of course. Miners get benefited from these `Searchers` because "Searchers" usually have to pay very high gas fees to actually be able to make a profitable transaction as the competition is very high. One example that we studied was `DEX Arbitrage` in our flash loan example.

This had led to the rise of research in the field of `Gas Golfing` - a fancy word for making minor optimizations to smart contracts and execution to try to minimize gas cost as much as possible, which allows Searchers to increase their gas price while lowering the gas fees thereby ending up with the same amount of total ETH paid for gas.


🤔 Why do searchers engage in doing gas golfing?

> Decreasing gas cost allows them to increase gas price while staying within budget for gas fees to make a profit

Searchers use the concept of `Gas Golfing` to be able to program transactions in such a way that they use the least amount of gas. This is because of the formulae `gas fees = gas price * gas used`. So if you decrease your `gas used`, you can increase your `gas price` to arrive at the same gas fees.

🤔 What role do Searchers play?

> Searchers run complex algorithms and bots to try to make profit on-chain


🤔 Why do miners choose to run the Flashbots software?

> Because they cannot keep track of all MEV opportunities alone

🤔 Today, most of the MEV is extracted by?

> Searchers

🤔 What is an example of an MEV opportunity?

> Liquidations on AAVE

> Trading on Uniswap

> Minting the next blue chip NFT

> All of the above

🤔 Why are frontrunning bots not common anymore?

> Because most MEV goes through Flashbots today which skips the public mempool

🤔 Flashbots Relay is currently centralized?

> True

🤔 What is the new RPC call introduced by Flashbots?

> eth_sendBundle