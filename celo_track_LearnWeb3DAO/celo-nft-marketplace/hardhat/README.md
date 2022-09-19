# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Shipping it

We will deploy this code on the Celo Alfajores Testnet, and will use Hardhat to do so. We need to get a few things in order to do this the right way.

1. Get a private key that has testnet funds on it to deploy the contract
2. Get an RPC URL for the Celo Testnet
3. Use environment variables to store our private key and RPC Url
  - Create a .env file
  - Use dotenv package to read environment variables within Hardhat
4. Configure hardhat.config.js and add the Alfajores testnet
5. Write a deployment script for Hardhat to automate deploys

## Deloy

```sh
npx hardhat run scripts/deploy.js --network alfajores
```

> Install some libraries

+ ts-node@10.9.1
+ hardhat-gas-reporter@1.0.9
+ @types/mocha@9.1.1
+ solidity-coverage@0.8.2
+ @typechain/hardhat@6.1.3
+ @nomicfoundation/hardhat-network-helpers@1.0.6
+ @nomicfoundation/hardhat-chai-matchers@1.0.3
+ @nomiclabs/hardhat-etherscan@3.1.0
+ typescript@4.8.3


Celo NFT deployed to: 0x2f4016FBD38e9e2E54043154F04995bD13CE7db2
NFT Marketplace deployed to: 0x0e34AF070FaB2ADB7feEE3B11509351bD0D369D2