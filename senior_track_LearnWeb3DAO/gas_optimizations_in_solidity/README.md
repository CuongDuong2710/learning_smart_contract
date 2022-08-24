# [Gas Optimizations in Solidity](https://learnweb3.io/courses/c446d19f-a25d-42c6-b3e4-4311c5040587/lessons/00a46a95-0493-46bf-95cb-7a98e62109d8)

## Tips and Tricks

### Variable Packing

If you remember we talked about storage slots in one of our previous levels. Now the interesting point in solidity if you remember is that `each storage slot is 32 bytes`.

This storage can be optimized which will further mean gas optimization when you deploy your smart contract if you pack your variables correctly.

Packing your variables means that `you pack or put together variables of smaller size so that they collectively form 32 bytes`. For example, you can `pack 32 uint8 into one storage slot` but for that to happen it is important that you declare them `consecutively` because the order of declaration of variables matters in solidity.

Given two code samples:

```sh
uint8 num1;
uint256 num2;
uint8 num3;
uint8 num4;
uint8 num5;
```

```sh
uint8 num1;
uint8 num3;
uint8 num4;
uint8 num5;
uint256 num2;
```

`The second one` is better because in the second one solidity compiler will `put all the uint8's in one storage slot` but in `the first case` it will `put uint8 num1 in one slot` but now `the next one it will see is a uint256 which is in itself requires 32 bytes cause 256/8 bits = 32 bytes` so it can't be put in the same storage slot as uint8 num1 so now `it will require another storage slot`. 

After that `uint8 num3, num4, num5 will be put in another storage slot`. Thus the second example requires 2 storage slots as compared to the first example which requires 3 storage slots.

It's also important to note that elements in `memory` and `calldata` cannot be packed and are not optimized by solidity's compiler.

🤔 The Solidity compiler can pack variables regardless of their order?

> False

### Storage vs Memory

Changing `storage variables` requires more gas than `variables in memory`. It's better to `update storage variables at the end after all the logic has already been implemented`.

So given two samples of code

```sh
contract A {
    uint public counter = 0;
    
    function count() {
        for(uint i = 0; i < 10; i++) {
            counter++;
        }
    }
    
}
```

```sh
contract B {
    uint public counter = 0;
    
    function count() {
        uint copyCounter;
        for(uint i = 0; i < 10; i++) {
            copyCounter++;
        }
        counter = copyCounter;
    }
    
}
```

The second sample of code is `more gas optimized` because we are `only writing to the storage variable counter only once` as compared to the first sample where we were `writing to storage in every iteration`. 

Even though we are performing one extra write overall in the second code sample, the `10 writes to memory and 1 write to storage` is still cheaper than `10 writes directly to storage`.

🤔 Should you write to storage variables in a loop, or create a local copy and update the storage variable at the end even if it means having a higher number of total read/writes?

> Create a local copy in memory because the cost of additional write is still lower than writing to storage all the time









