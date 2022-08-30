//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist {

    // max number whitelisted addresses allowed 
    uint8 public maxWhitelistedAddress;

    // if an address is whitelisted, we would set it to true. 
    // It is false by default for all other addresses 
    mapping(address => bool) public whitelistedAddress;

    // keep track how many addresses have been whitelisted
    uint8 public numAddressesWhitelisted;

    constructor (uint8 _maxWhitelistedAddress) {
        maxWhitelistedAddress = _maxWhitelistedAddress;
    }

    function addAddressToWhitelist() public {
        // check if the user has already been whitelisted
        require(!whitelistedAddress[msg.sender], "Sender has already been whitelisted");
        // check if numAddressesWhitelisted < maxWhitelistedAddress, if not then throw an error
        require(numAddressesWhitelisted < maxWhitelistedAddress, "More addreses can't be added, limit reached");
        // add the address which called this fuction to whitelisted
        whitelistedAddress[msg.sender] = true;
        // increases number of whitelisted addresses
        numAddressesWhitelisted += 1;
    }
}