// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Reserve.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is Ownable {
    // declare SafeMath libary usage for uint256
    using SafeMath for uint256;

    using Counters for Counters.Counter;
    StakingReserve public immutable reserve;
    IERC20 public immutable gold;
    event StakeUpdate(
        address account,
        uint256 packageId,
        uint256 amount,
        uint256 totalProfit
    );
    event StakeReleased(
        address account,
        uint256 packageId,
        uint256 amount,
        uint256 totalProfit
    );
    struct StakePackage {
        uint256 rate;
        uint256 decimal;
        uint256 minStaking;
        uint256 lockTime;
        bool isOffline;
    }
    struct StakingInfo {
        uint256 startTime;
        uint256 timePoint;
        uint256 amount;
        uint256 totalProfit;
    }
    Counters.Counter private _stakePackageCount;
    mapping(uint256 => StakePackage) public stakePackages;
    mapping(address => mapping(uint256 => StakingInfo)) public stakes;
    uint256 oneDay = 86400 seconds;
    uint256 oneYear = oneDay * 365;

    /**
     * @dev Initialize
     * @notice This is the initialize function, run on deploy event
     * @param tokenAddr_ address of main token
     * @param reserveAddress_ address of reserve contract
     */
    constructor(address tokenAddr_, address reserveAddress_) {
        gold = IERC20(tokenAddr_);
        reserve = StakingReserve(reserveAddress_);
        _stakePackageCount.increment();
    }

    /**
     * @dev Add new staking package
     * @notice New package will be added with an id
     */
    function addStakePackage(
        uint256 rate_,
        uint256 decimal_,
        uint256 minStaking_,
        uint256 lockTime_
    ) public onlyOwner {
        // TO-DO: check more require ???
        uint256 _stakePackageId = _stakePackageCount.current();
        stakePackages[_stakePackageId] = StakePackage(
            rate_,
            decimal_,
            minStaking_,
            lockTime_,
            false // StakePackage is online
        );
    }

    /**
     * @dev Remove an stake package
     * @notice A stake package with packageId will be set to offline
     * so none of new staker can stake to an offine stake package
     */
    function removeStakePackage(uint256 packageId_) public onlyOwner {
        // TO-DO: check more require ???
        require(
            stakePackages[packageId_].isOffline == false,
            "Staking: Package is offline"
        );
        delete stakePackages[packageId_];
    }

    /**
     * @dev User stake amount of gold to stakes[address][packageId]
     * @notice if is there any amount of gold left in the stake package,
     * calculate the profit and add it to total Profit,
     * otherwise just add completely new stake.
     */
    function stake(uint256 amount_, uint256 packageId_) external {
        // TO-DO: check more require ???
        require(
            stakePackages[packageId_].isOffline == false,
            "Staking: Package is offline"
        );
        require(amount_ > 0, "Staking: deposit more than zero");
        // approve spend gold
        require(gold.allowance(msg.sender, address(this)) > amount_);

        uint256 _totalProfit;

        // Get StakingInfo from stakes[address][packageId]
        StakingInfo storage _stakingInfo = stakes[msg.sender][packageId_];

        // check if is there any amount of gold left in the stake package
        if (_stakingInfo.amount > 0) {
            // add more amount to stakes[address][packageId]
            _stakingInfo.amount.add(amount_);

            // update timePoint for different deposit
            _stakingInfo.timePoint = block.timestamp;

            // calculate profit
            _totalProfit = calculateProfit(packageId_);

            // add it to exist total Profit
            _stakingInfo.totalProfit.add(_totalProfit);
        } else {
            // new staking
            stakes[msg.sender][packageId_] = StakingInfo(
                block.timestamp, // startTime
                block.timestamp, // timePoint
                amount_, // amount
                calculateProfit(packageId_) // totalProfit
            );
        }
        // emit event
        emit StakeUpdate(
            msg.sender,
            packageId_,
            _stakingInfo.amount,
            _stakingInfo.totalProfit
        );
    }

    /**
     * @dev Take out all the stake amount and profit of account's stake from reserve contract
     */
    function unStake(uint256 packageId_) external {
        // validate available package and approved amount
        require(
            stakePackages[packageId_].isOffline == false,
            "Staking: Package is offline"
        );

        // Get StakingInfo from stakes[address][packageId]
        StakingInfo storage _stakingInfo = stakes[msg.sender][packageId_];
        uint256 _amount = _stakingInfo.amount;
        uint256 _totalProfit = _stakingInfo.totalProfit;

        // return amount staking to user
        gold.transferFrom(address(this), msg.sender, _stakingInfo.amount);
        // return profit to user
        reserve.distributeGold(msg.sender, _stakingInfo.totalProfit);

        // emit event
        emit StakeReleased(msg.sender, packageId_, _amount, _totalProfit);
    }

    /**
     * @dev calculate current profit of an package of user known packageId
     */

    function calculateProfit(uint256 packageId_) public view returns (uint256) {
        StakingInfo storage _stakingInfo = stakes[msg.sender][packageId_];
        uint256 lockDays = block.timestamp.sub(_stakingInfo.timePoint);
        uint256 percentageProfit = lockDays
            .mul(getAprOfPackage(packageId_))
            .div(oneYear);
        // amount profit
        return percentageProfit.mul(_stakingInfo.amount).div(100000);
    }

    function getAprOfPackage(uint256 packageId_) public view returns (uint256) {
        StakePackage storage _stakePackage = stakePackages[packageId_];
        return _stakePackage.rate;
    }
}
