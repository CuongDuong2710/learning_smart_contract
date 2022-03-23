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

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account)
        public
        view
        override
        returns (uint256 balance)
    {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool success)
    {
        require(_balances[msg.sender] >= amount); // balances of owner contract
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount); // fire event
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool success) {
        require(_balances[sender] >= amount); // balances of sender not owner contract
        require(_allowance[sender][msg.sender] >= amount); // sender approve for owner contract spend money >= amount
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) 
        public
        override returns (bool success)
    {
        // owner approve for spender to spend amount, not need require. It's from transfer() function above
        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    } 

    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256 remaining)
    {
        return _allowance[owner][spender];
    }
}
