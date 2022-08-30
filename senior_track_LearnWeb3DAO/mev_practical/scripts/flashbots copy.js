const { FlashbotsBundleProvider } = require('@flashbots/ethers-provider-bundle')
const { BigNumber, Signer } = require('ethers')
const { ethers } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  // Deploy FakeNFT Contract
  const fakeNFT = await ethers.getContractFactory('FakeNFT')
  const FakeNFT = await fakeNFT.deploy()
  await FakeNFT.deployed()

  console.log('Address of Fake NFT Contract:', FakeNFT.address)

  // Create a Alchemy WebSocket Provider
  // Note the reason why we created a WebSocket provider this time is 
  // because we want to create a socket to listen to every new block that comes in Goerli network
  // we listen for each block and send a request in each block 
  // so that when the coinbase miner(miner of the current block) is a flashbots miner, our transaction gets included.
  const provider = new ethers.provider.WebSocketProvider(
    process.env.ALCHEMY_API_KEY_URL,
    'goerli'
  )

  // Wrap your private key in the ethers Wallet class
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  // Create a Flashbots Provider which will forward the request to the relayer
  // Which will further send it to the flashbot miner.
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    signer,
    // URL for the flashbots relayer
    'https://relay-goerli.flashbots.net',
    'goerli'
  )

  // we use our provider to listen for the block event. 
  // Every time a block event is called, we print the block number and send a bundle of transactions to mint the NFT. 
  // Note the bundle we are sending may or may not get included in the current block depending on whether the coinbase miner is a flashbot miner or not.
  provider.on('block', async (blockNumber) => {
    console.log('Block Number: ', blockNumber)
    // Send a bundle of transactions to the flashbot relayer
    const bundleResponse = await flashbotsProvider.sendBundle(
      [
        {
          transaction: {
            // ChainId for the Goerli network
            chainId: 5,
            // EIP-1559
            type: 2,
            // Value of 1 FakeNFT
            value: ethers.utils.parseEther('0.01'),
            // Address of the FakeNFT
            to: FakeNFT.address,
            // In the data field, we pass the function selector of the mint function
            data: FakeNFT.interface.getSighash('mint()'),
            // Max Gas Fes you are willing to pay
            maxFeePerGas: BigNumber.from(10).pow(9).mul(3), // 3 GWEI, 1 GWEI = 10*WEI = 10*10^8 = 10^9
            // Max Priority gas fees you are willing to pay
            maxPriorityFeePerGas: BigNumber.from(10).pow(9).mul(2), // 2 GWEI
          },
          signer: signer,
        },
      ],
      blockNumber + 1 // We want the transaction to be mined in the next block, so we add 1 to the current blocknumber and send this bundle of transactions.
    )

    if ('error' in bundleResponse) {
      console.log(bundleResponse.error.message)
    }
  })
}

main()
