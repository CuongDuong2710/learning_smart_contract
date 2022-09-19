// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Load the NFT contract artifacts
  const CeloNFTFactory = await ethers.getContractFactory("CeloNFT")

  // Deploy the contract
  const celoNftContract = await CeloNFTFactory.deploy()
  await celoNftContract.deployed()

  console.log("Celo NFT deployed to:", celoNftContract.address);

  // Load the marketplace contract artifacts
  const NFTMarketplaceFactory  = await ethers.getContractFactory("NFTMarketplace")

  const nftMarketplaceContract  = await NFTMarketplaceFactory.deploy()
  await nftMarketplaceContract.deployed()

  // Log the address of the new contract
  console.log("NFT Marketplace deployed to:", nftMarketplaceContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});