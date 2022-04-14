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
    IERC721 public immutable nftContract; // read-only and create one instance in constructor
    mapping(uint256 => Order) orders;
    uint256 public feeDecimal;
    uint256 public feeRate;
    address public feeRecipient; // address receives fee of transaction
    EnumerableSet.AddressSet private _supportedPaymentTokens;

    // add event
    event OrderAdded(
        uint256 indexed orderId,
        address indexed seller,
        uint256 indexed tokenId,
        address paymentToken,
        uint256 price
    );
    event OrderCancelled(uint256 indexed orderId);
    event OrderMatched(
        uint256 indexed orderId,
        address indexed seller,
        address indexed buyer,
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
            "NFTMarketplace: nftAddress_ is zero address"
        );
        nftContract = IERC721(nftAddress_);
        _updateFeeRecipient(feeRecipient_);
        _updateFeeRate(feeDecimal_, feeRate_);
        _orderIdCount.increment();
    }

    function _updateFeeRecipient(address feeRecipient_) internal {
        require(
            feeRecipient_ != address(0),
            "NFTMarketplace: feeRecipient_ is zero address"
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

    function updateFeeRate(uint256 feeDecimal_, uint256 feeRate_)
        external
        onlyOwner
    {
        _updateFeeRate(feeDecimal_, feeRate_);
    }

    function _calculateFee(uint256 orderId_) private view returns (uint256) {
        Order storage _order = orders[orderId_];
        if (feeRate == 0) {
            return 0;
        }
        // 10 * 100 / 10^(2): feeRate is 10%, order.price is 100, feeDecimal is 0
        // = 10
        // 10111 * 100 / 10^(7): feeRate is 10.111%, order.price is 100, feeDecimal is 5
        // = 0.1
        return (feeRate * _order.price) / 10**(feeDecimal + 2);
    }

    function isSeller(uint256 orderId_, address seller_)
        public
        view
        returns (bool)
    {
        return orders[orderId_].seller == seller_;
    }

    function addPaymentToken(address paymentToken_) external onlyOwner {
        require(
            paymentToken_ != address(0),
            "NFTMarketplace: feeRecipient_ is zero address"
        );
        require(
            _supportedPaymentTokens.add(paymentToken_),
            "NFTMarketplace: already supported"
        );
    }

    function isPaymentTokenSupported(address paymentToken_)
        public
        view
        returns (bool)
    {
        return _supportedPaymentTokens.contains(paymentToken_);
    }

    modifier onlySupportedPaymentToken(address paymentToken_) {
        require(
            isPaymentTokenSupported(paymentToken_),
            "NFTMarketplace: unsupported token"
        );
        _;
    }

    function addOrder(
        uint256 tokenId_,
        address paymentToken_,
        uint256 price_
    ) public onlySupportedPaymentToken(paymentToken_) {
        // check require supported payment token
        require(
            nftContract.ownerOf(tokenId_) == _msgSender(),
            "NFTMarketplace: sender is not owner of token"
        );
        require(
            nftContract.getApproved(tokenId_) == address(this) ||
                nftContract.isApprovedForAll(_msgSender(), address(this)),
            "NFTMarketplace: The contract is unauthorized to manage this token"
        );
        require(price_ > 0, "NFTMarketplace: price must be greater than 0");
        uint256 _orderId = _orderIdCount.current();
        orders[_orderId] = Order( // add new Order to mapping at _orderId index
            _msgSender(),
            address(0),
            tokenId_,
            paymentToken_,
            price_
        );
        _orderIdCount.increment(); // increment _orderId
        nftContract.transferFrom(_msgSender(), address(this), tokenId_); // transfer NFT token from seller to contract's address
        emit OrderAdded( // emit event
            _orderId,
            _msgSender(),
            tokenId_,
            paymentToken_,
            price_
        );
    }

    function cancelOrder(uint256 orderId_) external {
        Order storage _order = orders[orderId_];
        require(
            _order.buyer == address(0),
            "NFTMarketplace: buyer must be zero"
        );
        require(
            _order.seller == _msgSender(),
            "NFTMarketplace: seller must be owner"
        );
        uint256 _tokenId = _order.tokenId;
        delete orders[orderId_];
        nftContract.transferFrom(address(this), _msgSender(), _tokenId); // refund NFT token from contract's address to seller
        emit OrderCancelled(orderId_);
    }

    function executeOrder(uint256 orderId_) external {
        Order storage _order = orders[orderId_];
        require(
            _order.price > 0, "NFTMarketplace: order has been canceled"
        );
        require(
            !isSeller(orderId_, _msgSender()), // check _msgSender() is a buyer different with seller
            "NFTMarketplace: buyer must be different from seller"
        );
        require(
            orders[orderId_].buyer == address(0),
            "NFTMarketplace: buyer must be zero"
        );
        _order.buyer = _msgSender(); // set buyer is _msgSender()
        // 1. buyer send fee to nft contract
        uint256 _feeAmount = _calculateFee(orderId_);
        if (_feeAmount > 0) {
            IERC20(_order.paymentToken).transferFrom(
                _msgSender(),
                feeRecipient,
                _feeAmount
            );
        }
        // 2. buyer send amount (order.price - feeAmout) to seller
        IERC20(_order.paymentToken).transferFrom(
            _msgSender(),
            _order.seller,
            _order.price - _feeAmount
        );
        // 3. transfer NFT from seller to buyer
        // NFT is transfer from seller to contract's address - address(this) - at addOrder function
        nftContract.transferFrom(address(this), _msgSender(), _order.tokenId);
        emit OrderMatched(
            orderId_,
            _order.seller,
            _order.buyer,
            _order.tokenId,
            _order.paymentToken,
            _order.price
        );
    }
}
