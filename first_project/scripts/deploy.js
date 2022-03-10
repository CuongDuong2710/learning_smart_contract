// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const HelloWorldContractFactory = await hre.ethers.getContractFactory("HelloWorld")
  const helloWorldContract = await HelloWorldContractFactory.deploy("Hello World!")

  await helloWorldContract.deployed()

  console.log("HelloWorld deployed to:", helloWorldContract.address)

  // Deployed on testnet: HelloWorld deployed to: 0x2f4016FBD38e9e2E54043154F04995bD13CE7db2
  // https://testnet.bscscan.com/address/0x2f4016FBD38e9e2E54043154F04995bD13CE7db2
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
