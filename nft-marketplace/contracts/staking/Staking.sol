// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    struct StakePackage {
        uint256 rate;
        uint256 lockDays;
        uint256 minValue;
    }

    struct StakingInfo {
        uint256 startTime;
        uint256 timePoint;
        uint256 amount;
        uint256 totalProfit;
    }

    event StakeUpdate(
        address account,
        uint256 packageId,
        uint256 timestamp,
        uint256 amount,
        uint256 totalProfit
    );

    event StakeReleased(
        address account,
        uint256 packageId,
        uint256 timestamp,
        uint256 amount,
        uint256 totalProfit
    );

    uint256 public totalStake = 0;
    StakePackage[] public stakePackages;
    
    mapping(address => mapping(uint256 => StakingInfo)) stakes; // uint256 is packageId
}
