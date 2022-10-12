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

Celo NFT deployed to: 0x1a6CED04C19E0785Cb2815438171F728C865097f
NFT Marketplace deployed to: 0xA935B95D56Ab08684696c802Fc314BD6CB174103

## The Graph

> graph codegen

What this does is, it converts our schema.graphql entity into Typescript (actually, AssemblyScript) types so we can do type-safe programming in our script. We will see how now!

```sh
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Load contract ABI from abis\NFTMarketplace .json
✔ Load contract ABIs
  Generate types for contract ABI: NFTMarketplace (abis\NFTMarketplace .json)
  Write types to generated\NFTMarketplace\NFTMarketplace.ts
✔ Generate types for contract ABIs
✔ Generate types for data source templates
✔ Load data source template ABIs
✔ Generate types for data source template ABIs
✔ Load GraphQL schema from schema.graphql
  Write types to generated\schema.ts
✔ Generate types for GraphQL schema

Types generated successfully
```

See the files being imported from the `generated` folder? That's what `graph codegen` does. It converts our contract events and GraphQL entity definitions into Typescript types, so we can use them for type-safe programming in our script.

> graph auth

```sh
✔ Product for which to initialize · hosted-service
✔ Deploy key · ********************************
Deploy key set for https://api.thegraph.com/deploy/
```

> yarn deploy

```sh
yarn run v1.22.18
$ graph deploy --node https://api.thegraph.com/deploy/ cuongduong2710/celo-nft-marketplace

  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Compile data source: NFTMarketplace => build/NFTMarketplace/NFTMarketplace.wasm
✔ Compile subgraph
  Copy schema file build/schema.graphql
  Write subgraph file build/NFTMarketplace/abis/NFTMarketplace.json
  Write subgraph manifest build/subgraph.yaml
✔ Write compiled subgraph to build/
  Add file to IPFS build/schema.graphql
                .. QmS4cYdMSpow8NWBED3CMe3gqrVjrWx73jNswzmY7roPSh
  Add file to IPFS build/NFTMarketplace/abis/NFTMarketplace.json
                .. QmZq4GwpLMqEDuAe1V7gAtLRGcuaXh2XXDGSAkQYmiYotU
  Add file to IPFS build/NFTMarketplace/NFTMarketplace.wasm
                .. QmcKHQeAsv4rX8DGyKSZ3T4cHzLYDvEno9EwfZmaBKmfRe
✔ Upload subgraph to IPFS

Build completed: QmSBoADwGHE3J3RNfFWqEM3Lt8rX1dmhaef2zWvY9oQ61m

Deployed to https://thegraph.com/explorer/subgraph/cuongduong2710/celo-nft-marketplace

Subgraph endpoints:
Queries (HTTP):     https://api.thegraph.com/subgraphs/name/cuongduong2710/celo-nft-marketplace

✨  Done in 11.57s.
```

## Install Graphql FrontEnd

To get started with querying the subgraph, let's install the requisite libraries which will help us make GraphQL queries. Run the following in your terminal, while pointing to the frontend directory

```sh
npm install urql graphql
```

## Error

```sh
MetaMask - RPC Error: Internal JSON-RPC error

Error: missing revert data in call exception; Transaction reverted without a reason string
```

https://stackoverflow.com/questions/70580881/metamask-rpc-error-internal-json-rpc-error

- In `require()` send do not enough funds

```sh
// Cannot create a listing to sell NFT for < 0 ETH
require(price > 0, "MRKT: Price must be > 0");
```