//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist {

    // max number whitelisted addresses allowed 
    uint8 public maxWhitelistedAddress;

    // if an address is whitelisted, we would set it to true. 
    // It is false by default for all other addresses 
    mapping(address => bool) public whitelistedAddress;

    // keep track how many addresses have been whitelisted
    uint8 public numAddressWhiteListed;

    constructor (uint8 _maxWhitelistedAddress) {
        maxWhitelistedAddress = _maxWhitelistedAddress;
    }

    function addAddressToWhiteList() public {
        // check if the user has already been whitelisted
        require(!whitelistedAddress[msg.sender], "Sender has already been whitelisted");
        // check if numAddressWhiteListed < maxWhitelistedAddress, if not then throw an error
        require(numAddressWhiteListed < maxWhitelistedAddress, "More addreses can't be added, limit reached");
        // add the address which called this fuction to whitelisted
        whitelistedAddress[msg.sender] = true;
        // increases number of whitelisted addresses
        numAddressWhiteListed += 1;
    }
}