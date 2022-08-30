// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let gold;
  let staking;
  let reserve;
  // We get the contract to deploy

  // deploy Gold
  const Gold = await ethers.getContractFactory("Gold");
  gold = await Gold.deploy();
  await gold.deployed();
  console.log("Gold deployed to:", gold.address);

  // deploy Staking Reserve
  const StakingReserve = await ethers.getContractFactory("StakingReserve");
  reserve = await StakingReserve.deploy();
  await reserve.deployed();
  console.log("StakingReserve deployed to:", reserve.address);

  // deploy Staking
  const Staking = await ethers.getContractFactory("Staking");
  staking = await Staking.deploy(gold.address, reserve.address);
  await staking.deployed();
  console.log("Staking deployed to:", staking.address);

  // Deployed on testnet:
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
