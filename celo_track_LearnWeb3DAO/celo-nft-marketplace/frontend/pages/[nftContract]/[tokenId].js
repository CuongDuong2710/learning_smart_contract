import { Contract } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "urql";
import { useContract, useSigner, erc721ABI } from "wagmi";
import MarketplaceABI from "../../abis/NFTMarketplace.json";
import Navbar from "../../components/Navbar";
import { MARKETPLACE_ADDRESS, SUBGRAPH_URL } from "../../constants";
import styles from "../../styles/Details.module.css";

export default function NFTDetails {
  // Extract NFT contract address and Token ID from URL
  const router = useRouter()
  const nftAddress = router.query.nftContract
  const tokenId = router.query.tokenId

  // State variables to contain NFT and listing information
  const [listing, setListing] = useState()
  const [name, setName] = useState("")
  const [imageURI, setImageURI] = useState("")
  const [isOwner, setIsOwner] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // State variable to contain new price if updating listing
  const [newPrice, setNewPrice] = useState("")

  // State variables to contain various loading states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [buying, setBuying] = useState(false);

  // Fetch signer from wagmi
  const { data: signer } = useSigner();

  const MarketplaceContract = useContract({
    addressOrName: MARKETPLACE_ADDRESS,
    contractInterface: MarketplaceABI,
    signerOrProvider: signer
  })

  async function fetchListing() {
    const listingQuery = `
      query ListingQuery {
        listingEntities(where: {
          nftAddress: "${nftAddress}",
          tokenId: "${tokenId}"
        }) {
          id
          nftAddress
          tokenId
          price
          seller
          buyer
        }
      }
    `;

    const urqlClient = createClient({ url: SUBGRAPH_URL })

    // Send the query to the subgraph GraphQL API, and get the response
    const response = await urqlClient.query(listingQuery).toPromise()
    const listingEntities = response.data?.listingEntities

    // If no active listing is found with the given parameters,
    // inform user of the error, then redirect to homepage
    if (listingEntities.length === 0) {
      window.alert("Listing does not exist or has been canceled")
      return router.push("/")
    }

    // Grab the first listing - which should be the only one matching the parameters
    const listing = listingEntities[0]

    // Get the signer address
    const address = await signer.getAddress()

    // Update state variables
    setIsActive(listing.buyer === null)
    setIsOwner(address.toLowerCase() === listing.seller.toLowerCase())
    setListing(listing)
  }
}