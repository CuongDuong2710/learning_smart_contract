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
    IERC721 public immutable nftContracts; // read-only and create one time in constructor
    mapping(uint256 => Order) orders;
    uint256 feeDecimal;
    uint256 feeRate;
    address public feeRecipient; // address receives fee of transaction
    EnumerableSet.AddressSet private _supportedPaymentTokens;
    
    // add event
    event OrderAdded (
        uint256 indexed orderId,
        uint256 indexed seller,
        uint256 indexed tokenId,
        address paymentToken,
        uint256 price
    );
    event OrderCancelled (
        uint256 indexed orderId
    );
    event OrderMatched (
        uint256 indexed orderId,
        uint256 indexed seller,
        uint256 indexed buyer,
        uint256 tokenId,
        address paymentToken,
        uint256 price
    );
    event FeeRateUpdated (
        uint256 feeDecimal,
        uint256 feeRate
    );
}