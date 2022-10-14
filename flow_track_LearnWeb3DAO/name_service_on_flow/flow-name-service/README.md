This is a [Flow](http://onflow.org/) project scaffolded with [flow-app-scafold](https://github.com/onflow/flow-app-scaffold).

## Getting Started

1. [Install the Flow CLI](https://github.com/onflow/flow-cli).

2. Start the emulator.

```bash
flow emulator
```

## Acess acount and self

``access(self)`` allows the code within the smart contract to access that function/variable - whereas ``access(account)`` allows the account to access the function/variable - which includes the code itself as well.

Therefore, ``access(account)`` here means you, the owner, have access to this function even if calling the smart contract externally. It also means that other smart contracts you have deployed to the same account can also access this function.


