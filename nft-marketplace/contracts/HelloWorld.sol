// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract HelloWorld {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function printHelloWorld() public view returns (string memory) {
        console.log("printHelloWorld: ", message);
        return message;
    }

    function updateMessage(string memory _newMessage) public {
        console.log("updateMessage: ", _newMessage);
        message = _newMessage;
    }
}