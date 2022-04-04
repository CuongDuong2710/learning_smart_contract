// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Marketplace is Ownable {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.AddressSet;

    struct Order {
        address seller;
        address buyer;
        uint256 tokenId;
        address paymentToken;
        uint256 price;
    }
    Counters.Counter private _orderIdCount;
    IERC721 public immutable nftContract; // read-only and create one time in constructor
    mapping(uint256 => Order) orders;
    uint256 public feeDecimal;
    uint256 public feeRate;
    address public feeRecipient; // address receives fee of transaction
    EnumerableSet.AddressSet private _supportedPaymentTokens;

    // add event
    event OrderAdded(
        uint256 indexed orderId,
        uint256 indexed seller,
        uint256 indexed tokenId,
        address paymentToken,
        uint256 price
    );
    event OrderCancelled(uint256 indexed orderId);
    event OrderMatched(
        uint256 indexed orderId,
        uint256 indexed seller,
        uint256 indexed buyer,
        uint256 tokenId,
        address paymentToken,
        uint256 price
    );
    event FeeRateUpdated(uint256 feeDecimal, uint256 feeRate);

    // constructor
    constructor(
        address nftAddress_,
        uint256 feeDecimal_,
        uint256 feeRate_,
        address feeRecipient_
    ) {
        require(
            nftAddress_ != address(0),
            "Marketplace: nftAddress_ is zero address"
        );
        nftContract = IERC721(nftAddress_);
        _updateFeeRecipient(feeRecipient_);
        _updateFeeRate(feeDecimal_, feeRate_);
        _orderIdCount.increment();
    }

    function _updateFeeRecipient(address feeRecipient_) internal {
        require(
            feeRecipient_ != address(0),
            "Marketplace: feeRecipient_ is zero address"
        );
        feeRecipient = feeRecipient_;
    }

    function updateFeeRecipient(address feeRecipient_) external onlyOwner {
        _updateFeeRecipient(feeRecipient_);
    }

    function _updateFeeRate(uint256 feeDecimal_, uint256 feeRate_) internal {
        // feeRate: 10%, feeDecimal: 0 => 10% < 10**(0 + 2) => 10% < 100% (10/100)
        // feeRate: 0.1% (cannot input 0.1 because uint256), feeDecimal: 1 => 1% < 10**(1 + 2) => 1% < 1000 (1/1000)
        require(
            feeRate_ < 10**(feeDecimal_ + 2),
            "NFTMarketplace: bad fee rate"
        );
        feeDecimal = feeDecimal_;
        feeRate = feeRate_;
        emit FeeRateUpdated(feeDecimal_, feeRate_);
    }

    function updateFeeRate(uint256 feeDecimal_, uint256 feeRate_) external onlyOwner {
        _updateFeeRate(feeDecimal_, feeRate_);
    }
}
