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
        uint8[3] rankRate; // tỉ lệ tương ứng random ra các rank
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
        gold.transferFrom(_msgSender(), address(this), price_); // owner send price to contract's address

        // increment tokenId and mint to owner
        _tokenIdCount.increment();
        uint256 _tokenId = _tokenIdCount.current();
        _mint(_msgSender(), _tokenId);

        // create new Petty with random rank
        uint8 _rank = _generateRandomRankWithRatio(ranks, _idToGacha[gachaId_].rankRate);
        _tokenIdToPetty[_tokenId] = Petty(_rank, 0); // saving new Petty
        
        return _tokenId;
    }

    // only contract owner has permission to call mint()
    function mint(address to_) public onlyOwner returns (uint256) {
        _tokenIdCount.increment();
        uint256 tokenId = _tokenIdCount.current();
        _mint(to_, tokenId);
        return tokenId;
    }

 /**
     * @dev Lấy ngẫy nhiên một rank từ array rank truyền vào theo tỉ lệ nhất định
     * @param rankRate_ array bao gồm các ranks
     * @param ratios_ tỉ lệ tương ứng random ra các rank
     */
    function _generateRandomRankWithRatio(
        uint8[3] memory rankRate_,
        uint8[3] memory ratios_ //[60, 40, 0]
    ) public view returns (uint8) {
        uint256 rand = _randInRange(1, 100);
        uint16 flag = 0;
        for (uint8 i = 0; i < rankRate_.length; i++) {
            if (rand <= ratios_[i] + flag && rand >= flag) {
                return rankRate_[i];
            }
            flag = flag + ratios_[i];
        }
        return 0;
    }

    /**
     * @dev Random trong khoảng min đến max
     */
    function _randInRange(uint256 min, uint256 max)
        public
        view
        returns (uint256)
    {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
            )
        ) % (max + 1 - min);
        return num + min;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function updateBaseURI(string memory baseTokenURI_) public onlyOwner {
        _baseTokenURI = baseTokenURI_;
    }
}