// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC20.sol";

contract SampleToken is IERC20 {
    constructor() {}

    function totalSupply() public view override returns (uint256) {}

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {}

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {}

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {}

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {}

    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256 remaining)
    {}
}
