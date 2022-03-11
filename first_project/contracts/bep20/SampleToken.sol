// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC20.sol";

contract SampleToken is IERC20 {
    uint256 private _totalSupply;
    // mapping[address] => _balances
    mapping(address => uint256) private _balances;
    // mapping[sender][spender] => _allowance
    mapping(address => mapping(address => uint256)) private _allowance;

    constructor() {
        _totalSupply = 1000000;
        _balances[msg.sender] = 1000000; // owner contract address hold total supply of token
    }

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
