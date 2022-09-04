# MEV practical

Let's install a few more dependencies to help us further

```sh
npm install @flashbots/ethers-provider-bundle @openzeppelin/contracts dotenv
```

Let's start off by creating a FakeNFT Contract. Under your contracts folder create a new file named `FakeNFT.sol` and add the following lines of code to it

```sh
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FakeNFT is ERC721 {

    uint256 tokenId = 1;
    uint256 constant price = 0.01 ether;
    constructor() ERC721("FAKE", "FAKE") {
    }

    function mint() public payable {
        require(msg.value == price, "Ether sent is incorrect");
        _mint(msg.sender, tokenId);
        tokenId += 1;
    }
}
```

This is a pretty simple ERC-721 contract that allows minting an NFT for 0.01 ETH.

Now let's replace the code present in `hardhat.config.js` with the following lines of code

```sh
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: QUICKNODE_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
```

Note that we are using `goerli` here which is an Ethereum testnet, similar to Rinkeby and Ropsten, but the only one supported by Flashbots.

Now its time to set up some environment variables, create a new file `.env` under your root folder, and add the following lines of code to it.

```sh
QUICKNODE_RPC_URL="QUICKNODE_RPC_URL"
PRIVATE_KEY="YOUR-PRIVATE-KEY"
QUICKNODE_WS_URL="QUICKNODE_WS_URL"
```



Transaction hash
https://goerli.etherscan.io/tx/0x822c9bbd0b53d1a3ac97370f5b53d58ecb66f5847671156ec03d8843a8ec2b5b


