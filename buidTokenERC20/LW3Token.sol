// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract LW3Token is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 10 * 10 ** 18);
    }
}

// deploy on remix ethereum
// Run on Injected Web 3 Environment (connect to Metamask - Rinkeby testnet)
// Contract address: 0x297085443bd6cb6fa7a68bda72fdf5403218df80