// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    struct StakingInfo {
        uint256 rate;
        uint256 minAmount;
    }

    mapping(address => mapping(address => StakingInfo)) stakemap;
}
