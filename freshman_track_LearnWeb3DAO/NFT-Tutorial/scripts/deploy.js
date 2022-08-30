const { ethers } = require("hardhat");

async function main() {
  /*
A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
so nftContract here is a factory for instances of our GameItem contract.
*/
  const nftContract = await ethers.getContractFactory("GameItem");

  const deployedNFTContract = await nftContract.deploy();
  console.log("deployedNFTContract: ", deployedNFTContract.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})

//     npx hardhat run scripts/deploy.js --network rinkeby
