// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/** Practice:
 * Đề bài: Có một số game yêu cầu thời gian breed (thời gian ấp trứng) trước khi nft mới được sinh ra.
 * Hãy update thêm vào contract để có những chức năng sau:
 *  - Mỗi NFT với một rank khác nhau sẽ có breeding time khác nhau
 *  - Khi thực hiện breed, user sẽ mất một khoảng thời gian breeding time trước khi được quyền claim NFT mới
 */
contract PettyGacha is ERC721, Ownable {
    using Counters for Counters.Counter;
    string private _baseTokenURI;

    Counters.Counter private _tokenIdCount;
    Counters.Counter private _gachaIdCount;

    IERC20 public immutable gold;

    constructor(address goldAddress_) ERC721("Petty", "PET") {
        gold = IERC20(goldAddress_);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(100 * 10**18, [60, 40, 0]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(200 * 10**18, [30, 50, 20]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(300 * 10**18, [10, 40, 50]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(100 * 10**18, [100, 0, 0]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(100 * 10**18, [0, 100, 0]);
        _gachaIdCount.increment();
        _idToGacha[_gachaIdCount.current()] = Gacha(100 * 10**18, [0, 0, 100]);
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
        // owner send price to contract's address
        gold.transferFrom(_msgSender(), address(this), price_);

        // increment tokenId and mint to owner
        _tokenIdCount.increment();
        uint256 _tokenId = _tokenIdCount.current();
        _mint(_msgSender(), _tokenId);

        // create new Petty with random rank
        uint8 _rank = _generateRandomRankWithRatio(
            ranks,
            _idToGacha[gachaId_].rankRate
        );
        _tokenIdToPetty[_tokenId] = Petty(_rank, 0);

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

    /** Practice - suggestion:
     * update hàm breed để hàm không mint Petty ngay lập tức
     * Các thông tin của lượt breed được lưu lại với một Id để User có thể claim khi breed time kết thúc
     * Gợi ý: Lưu breed dưới dạng mapping(tokenId => Struct)
     */
    function breedPetties(uint256 tokenId1_, uint256 tokenId2_) public {
        require(
            ownerOf(tokenId1_) == _msgSender(),
            "PettyGacha: sender is not owner of token"
        );
        require(
            (getApproved(tokenId1_) == address(this) &&
                getApproved(tokenId2_) == address(this)) ||
                isApprovedForAll(_msgSender(), address(this)),
            "PettyGacha: The contract is unauthorized to manage this token"
        );
        uint8 _rank = _tokenIdToPetty[tokenId1_].rank;
        require(
            _rank == _tokenIdToPetty[tokenId2_].rank,
            "PettyGacha: must same rank"
        );
        require(_rank < 3, "PettyGacha: petties is at the highest rank");

        // set new rank
        uint8 _newRank = _tokenIdToPetty[tokenId1_].rank + 1;

        // burn token & delete mapping
        _burn(tokenId1_);
        _burn(tokenId2_);
        delete _tokenIdToPetty[tokenId1_];
        delete _tokenIdToPetty[tokenId2_];

        // increment tokenId and mint to owner
        _tokenIdCount.increment();
        uint256 _newTokenId = _tokenIdCount.current();
        _mint(_msgSender(), _newTokenId);

        // create new Petty
        _tokenIdToPetty[_newTokenId] = Petty(_newRank, 0);
    }

    /** Practice - suggestion:
     * Hàm claimsBreedPetty phục vụ việc claim một Petty sau quá trình breed
     * Hàm sẽ check user có đủ quyền để claim không và check Petty đã sẵn sàng để claim chưa.
     * Sau khi check user đã sẵn sàng claim, thực hiện mint nft mới cho user với rank++
     * Cần đảm bảo mỗi breedId chỉ được claim 1 lần
     */
    function claimsBreedPetty(uint256 breedId_) public {
        
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function updateBaseURI(string memory baseTokenURI_) public onlyOwner {
        _baseTokenURI = baseTokenURI_;
    }
}
