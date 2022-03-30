// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Petty is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCount;

    constructor() ERC721("Petty", "PET") {}

    function mint(address to_) public onlyOwner returns (uint256) {
        _tokenIdCount.increment();
        uint256 tokenId = _tokenIdCount.current();
        _mint(to_, tokenId);
        return tokenId;
    }
}
