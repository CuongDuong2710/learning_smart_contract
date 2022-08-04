[Delegate Call](https://www.learnweb3.io/tracks/senior/delegate-call)

![How Storage works on delegatecall!](./images/how_storage_works_on_delegatecall.png "How Storage works on delegatecall") 

**.delegatecall()** is a method in Solidity used to call a function in a target contract from an original contract. However, unlike other methods, when the function is executed in the target contract using **.delegatecall()**, the context is passed from the original contract i.e. the code executes in the target contract, but variables get modified in the original contract.

## Wait, what?

The important thing to note when using .delegatecall() is that the context the original contract is passed to the target, and all state changes in the target contract reflect on the original contract's state and not on the target contract's state even though the function is being executed on the target contract.

> 🤔 What happens when the target contract is called from the original contract using the `delegatecall()` method?

=> It executes the function using the context of the original contract

In Ethereum, a function can be represented as `4 + 32*N` bytes where 4 bytes are for the function selector and the `32*N` bytes are for function arguments.

- **Function Selector**: To get the function selector, we hash the function's name along with the type of its arguments without the empty space eg. for something like `putValue(uint value)`, you will hash `putValue(uint)` using `keccak-256` which is a hashing function used by Ethereum and then take its first 4 bytes. To understand keccak-256 and hashing better, I suggest you watch this [video](https://www.youtube.com/watch?v=rxZR3ITZlzE)

- **Function Argument**: Convert each argument into a hex string with a fixed length of 32 bytes and concatenate them.

> 🤔 How can a function in Ethereum be represented?

=> 4 + 32*N where N is the number of arguments in the function

>  How do we construct a function selector?

=> We hash the function's name along with the arguments without the empty space and then takes its first 4 bytes

> What is a function argument in context of delegatecall?

=> Function argument is created when you convert each argument into a 32 bytes hex string and then concatenate them