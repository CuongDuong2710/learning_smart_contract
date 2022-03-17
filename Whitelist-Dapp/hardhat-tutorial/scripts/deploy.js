const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  // here we deploy contract
  const deployedWhitelistContract = await whitelistContract.deploy(10);

  // wait for it to deploy finished
  await deployedWhitelistContract.deployed();

  // print address of deployed contract
  console.log(
    "Whitelist Contract Address: ",
    deployedWhitelistContract.address
  );
  // Whitelist Contract Address:  0xA935B95D56Ab08684696c802Fc314BD6CB174103
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });

// https://faucets.chain.link/rinkeby
// https://rinkeby.etherscan.io/