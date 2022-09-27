import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Listing from '../components/Listing'
import { createClient } from 'urql'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { SUBGRAPH_URL } from '../constants'
import { useAccount } from 'wagmi'

export default function Home() {
  // State variables to contain active listings and signify a loading state
  const [listings, setListings] = useState()
  const [loading, setLoading] = useState(false)

  const { isConnected } = useAccount()

  // Function to fetch listings from the subgraph
  setLoading(true)
  // The GraphQL query to run
  const listingsQuery = `
  query ListingsQuery {
    listingEntities {
      id
      nftAddress
      tokenId
      price
      seller
      buyer
    }
  }`

  // Create a urql client
  const urqlClient = createClient({
    url: SUBGRAPH_URL,
  })

  
}
