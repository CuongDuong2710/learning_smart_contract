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


