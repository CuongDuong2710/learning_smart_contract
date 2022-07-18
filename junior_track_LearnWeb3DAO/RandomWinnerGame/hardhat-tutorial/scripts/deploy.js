// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat')
require('dotenv').config({ path: '.env' })
require('@nomiclabs/hardhat-etherscan')
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require('../constants')
const hre = require('hardhat')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main() {
  /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so randomWinnerGame here is a factory for instances of our RandomWinnerGame contract.
  */
  const randomWinnerGame = await ethers.getContractFactory('RandomWinnerGame')

   // deploy the contract
  const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  )
  await deployedRandomWinnerGameContract.deployed()

  console.log(
    'Verify Contract Address:',
    deployedRandomWinnerGameContract.address
  )

  console.log('Sleeping.....')

  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000)

  // Verify the contract after deploying
  await hre.run('verify:verify', {
    address: deployedRandomWinnerGameContract.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  })

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
