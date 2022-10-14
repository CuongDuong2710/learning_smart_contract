import FungibleToken from "./interfaces/FungibleToken.cdc"
import NonFungibleToken from "./interfaces/NonFungibleToken.cdc"
import FlowToken from "./tokens/FlowToken.cdc"

// The Domains contract defines the Domains NFT Collection
// to be used by flow-name-service
pub contract Domains: NonFungibleToken {
  
  // Struct that represents information about an FNS domain
  pub struct DomainInfo {
    // Public Variables of the Struct
    pub let id: UInt64
    pub let owner: Address
    pub let name: String
    pub let nameHash: String
    pub let expiresAt: UFix64
    pub let address: Address?
    pub let bio: String
    pub let createAt: UFix64

    // Struct initializer
    init(
      id: UInt64,
      owner: Address,
      name: String,
      nameHash: String,
      expiresAt: UFix64,
      address: Address?,
      let bio: String,
      createAt: UFix64
    ) {
      self.id = id
      self.owner = owner
      self.name = name
      self.nameHash = nameHash
      self.expiresAt = expiresAt
      self.address = address
      self.bio = bio
      self.createAt = createAt
    }
  }

  pub resource interface DomainPublic {
    pub let id: UInt64
    pub let name: String
    pub let nameHash: String
    pub let createAt: UFix64

    pub fun getBio(): String
    pub fun getAddress(): Address?
    pub fun getDomainName(): String
    pub fun getInfo(): DomainInfo
  }

  //  We don't want any third-party to have access to functions
  pub resource interface DomainPrivate {
    pub fun setBio(bio: String)
    pub fun setAddress(addr: String)
  }

  pub resource NFT: DomainPublic, DomainPrivate, NonFungibleToken.INFT {
    pub let id: UInt64
    pub let name: String
    pub let nameHash: String
    pub let createAt: UFix64

    // access(self) implies that only the code within this resource
    // can read/modify this variable directly
    // This is similar to `private` in Solidity
    access(self) var address: Address?
    access(self) var bio: String

    init(id: UInt64, name: String, nameHash: String) {
      self.id = id
      self.name = name
      self.nameHash = nameHash
      self.createAt = getCurrentBlock().timestamp
      self.address = nil
      self.bio = ""
    }

    pub fun getBio(): String {
      return self.bio
    }

    pub fun getAddress(): Address? {
      return self.address
    }

    pub fun getDomainName(): String {
      return self.name.concat(".fns")
    }
  }
}
