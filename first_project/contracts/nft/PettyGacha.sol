// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PettyGacha is ERC721, Ownable {
    using Counters for Counters.Counter;
    string private _baseTokenURI;

    Counters.Counter private _tokenIdCount;
    Counters.Counter private _gachaIdCount;

    IERC20 public immutable gold;

    constructor(address goldAddress_) ERC721("Petty", "PET") {
        gold = IERC20(goldAddress_);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(100 * 10**18, [60, 40, 0]); // 100 * 10^8 => 100 ether
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(200 * 10**18, [30, 50, 20]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(300 * 10**18, [40, 50, 10]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(400 * 10**18, [10, 20, 70]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(500 * 10**18, [20, 40, 40]);
    }

    struct Gacha {
        uint256 price;
        uint8[3] rankRate;
    }
    struct Petty {
        uint8 rank;
        uint8 stat;
    }
    uint8[3] public ranks = [1, 2, 3];
    mapping(uint256 => Gacha) public _idToGacha;
    mapping(uint256 => Petty) public _tokenIdToPetty;

    function openGacha(uint8 gachaId_, uint256 price_)
        public
        returns (uint256)
    {
        require(_idToGacha[gachaId_].price > 0, "PettyGacha: invalid gacha");
        require(
            price_ == _idToGacha[gachaId_].price,
            "PettyGache: price not matched"
        );
        gold.transferFrom(_msgSender(), address(this), price_);
    }

    // only contract owner has permission to call mint()
    function mint(address to_) public onlyOwner returns (uint256) {
        _tokenIdCount.increment();
        uint256 tokenId = _tokenIdCount.current();
        _mint(to_, tokenId);
        return tokenId;
    }


    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function updateBaseURI(string memory baseTokenURI_) public onlyOwner {
        _baseTokenURI = baseTokenURI_;
    }
}
