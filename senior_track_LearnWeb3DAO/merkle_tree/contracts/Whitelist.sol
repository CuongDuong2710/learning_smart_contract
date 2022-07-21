// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Whitelist {
  bytes32 public merkleRoot;

  /* So as we mentioned we are not storing the address of each user in the contract, 
   instead, we are only storing the root of the merkle tree which gets initialized in the constructor. */
  constructor(bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  /**
  * maxAllowanceToMint: is a variable that keeps track of the number of NFT's a given address can mint.
  */
  function checkInWhitelist(bytes32[] calldata proof, uint64 maxAllowanceToMint) view public returns (bool) {
    // The value we are actually storing in the Merkle Tree, for this use case, 
    // is storing the address of the user along with how many NFTs they are allowed to min
    bytes32 leaf = keccak256(abi.encode(msg.sender, maxAllowanceToMint));
    // Now we use the OpenZeppelin's MerkleProof library to verify that the proof sent by the user is indeed valid
    bool verified = MerkleProof.verify(proof, merkleRoot, leaf);
    return verified;
  }
}
