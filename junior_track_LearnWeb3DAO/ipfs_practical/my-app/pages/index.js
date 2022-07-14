import { Contract, providers, utils } from 'ethers'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Web3Modal from 'web3modal'
import { abi, NFT_CONTRACT_ADDRESS } from '../constants'
import styles from '../styles/Home.module.css'

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false)
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false)
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState('0')
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef()

  /**
   * publicMint: Mint an NFT
   */
  const publicMint = async () => {
    try {
      console.log('Public mint')
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner()
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer)
      // call the mint from the contract to mint the LW3Punks
      const tx = await nftContract.mint({
        // value signifies the cost of one LW3Punks which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther('0.01'),
      })
      setLoading(true)
      // wait for the transaction to get mined
      await tx.wait()
      setLoading(false)
      window.alert('You successfully minted a LW3Punk!')
    } catch (error) {
      console.error(err)
    }
  }

  return <div></div>
}
