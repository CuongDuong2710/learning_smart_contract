import { Contract } from 'ethers'
import { isAddress, parseEther } from 'ethers/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { useSigner, erc721ABI } from 'wagmi'
import MarketplaceABI from '../abis/NFTMarketplace.json'
import Navbar from '../components/Navbar'
import styles from '../styles/Create.module.css'
import { MARKETPLACE_ADDRESS } from '../constants'
import { themeVars } from '@rainbow-me/rainbowkit/dist/css/sprinkles.css'

export default function Create() {
  // State variables to contain information about the NFT being sold
  const [nftAddress, setNftAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [showListingLink, setShowListingLink] = useState(false)

  // Get signer from wagmi
  const { data: signer } = useSigner()

  // Main function to be called when 'Create' button is clicked
  async function handleCreateListing() {
    // Set loading status to true
    setLoading(true)

    try {
      // Make sure the contract address is a valid address
      const isValidAddress = isAddress(nftAddress)
      if (!isValidAddress) {
        throw new Error(`Invalid contract address`)
      }

      // Request approval over NFTs if requred, then create listing
      await requestApproval()
      await createListing()

      // Start displaying a button to view the NFT details
      setShowListingLink(true)
    } catch (error) {
      console.error(error)
    }

    // Set loading status to false
    setLoading(false)
  }

  // Function to check if NFT approval is required
  async function requestApproval() {
    // Get signer's address
    const address = await signer.getAddress()

    // Initialize a contract instance for the NFT contract
    const ERC721Contract = new Contract(nftAddress, erc721ABI, signer)

    // Make sure user is owner of the NFT in question
    const tokenOwner = await ERC721Contract.ownerOf(tokenId)
    if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
      throw new Error(`You do not own this NFT`)
    }

    // Check if user already gave approval to the marketplace
    const isApproved = await ERC721Contract.isApprovedForAll(
      address,
      MARKETPLACE_ADDRESS
    )

    // If not approved
    if (!isApproved) {
      console.log('Requesting approval over NFTs...')

      // Send approval transaction to NFT contract
      const approvalTxn = await ERC721Contract.setApprovalForAll(
        MARKETPLACE_ADDRESS,
        true
      )
      await approvalTxn.wait()
    }
  }
}
