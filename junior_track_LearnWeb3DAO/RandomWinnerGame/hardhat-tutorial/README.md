# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# Chainlink VRF
- Deploy contract
Verify Contract Address: 0xeF34eF4787D26D7957c587274354Dc39947990F2
Verify Contract Address: 0x80B400d23db9ba57D5d6237aBD0a2040aE6AAc82

Sleeping.....
Nothing to compile

- Verify the contract after deploying
Successfully submitted source code for contract
contracts/RandomWinnerGame.sol:RandomWinnerGame at 0xeF34eF4787D26D7957c587274354Dc39947990F2
for verification on the block explorer. Waiting for verification result...

Successfully verified contract RandomWinnerGame on Etherscan.
https://mumbai.polygonscan.com/address/0xeF34eF4787D26D7957c587274354Dc39947990F2#code

- Start game transaction
https://mumbai.polygonscan.com/tx/0xdfe44ff99cb77bfaf7a26cf19d43dce556904df8b16596e18ac0a6c46f360463

- Join game transaction
https://mumbai.polygonscan.com/tx/0x0081a8d81e48b0651734ed1eb57b433e334e488a4b87e3e52479569f712a9989

# Error deploy

Error: could not detect network 

> Wait for etherscan to notice that the contract has been deployed
> may be increate time to wait: await sleep(50000)

# Install Graph protocal

- Install Graph CLI

> yarn global add @graphprotocol/graph-cli

- Init Subgraph

> graph init --contract-name RandomWinnerGame --product hosted-service GITHUB_USERNAME/Learnweb3  --from-contract YOUR_RANDOM_WINNER_GAME_CONTRACT_ADDRESS  --abi ./abi.json --network mumbai graph

> graph init --contract-name RandomWinnerGame --product hosted-service cuongduong2710/learn-web3  --from-contract 0x80B400d23db9ba57D5d6237aBD0a2040aE6AAc82  --abi ./abi.json --network mumbai graph



