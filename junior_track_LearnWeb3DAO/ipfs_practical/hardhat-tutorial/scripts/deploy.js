const { ethers } = require('hardhat')
require('dotenv').config({ path: '.env' })
const hre = require("hardhat");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main() {
  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL =
    'ipfs.io/ipfs/QmQBHarz2WFczTjz5GnhjHrbUPDnB48W5BM2v2h6HbE1rZ'

  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const lw3PunksContract = await ethers.getContractFactory('LW3Punks')

  // deploy the contract
  const deployedLW3PunksContract = await lw3PunksContract.deploy(metadataURL)

  await deployedLW3PunksContract.deployed()

  // print the address of the deployed contract
  console.log('LW3Punks Contract Address:', deployedLW3PunksContract.address)
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
