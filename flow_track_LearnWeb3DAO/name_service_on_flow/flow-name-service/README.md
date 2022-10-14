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

## RoadBlocks in NFT resource

So far so good, pretty basic. But here we have hit two roadblocks.

1. For the `getInfo()` function that will return a `DomainInfo` struct, we don't currently have a way to fetch the `owner` of a given NFT. We also do not have a way to get the `expiresAt `property.
2. For the `setBio()` and `setAddress()` function, we must ensure that the domain has not crossed it's expiry date, in which case the owner should not be allowed to modify anything.

You must be thinking why didn't we just add those two properties directly into the `NFT` resource. Well, a couple of reasons.

1. We want to have global track of the owners of all domains, and the expiry dates of all domains, in existence, and tying them to the NFT resource means we` will have to fetch it from the account storage of potentially a lot of different accounts`.
2. We want to have the ability to modify the expiration date of a domain when it is renewed, for example, and `it is not wise to put that function in the Public portion of the NFT`, and if we put it in the Private portion we `lose access to that function as that's only accessible to the NFT owner.`

> Solution

**So, let's zoom out a bit**, and step outside the NFT resource for a second. Go back to the top-level of your code, and add a couple of global variables.

```sh
pub let owners: {String: Address}
pub let expirationTimes: {String: UFix64}
```

We will use this `dictionaries (mappings)` to store information about all domain owners and the expiry times. The key (String) will be the domain's `nameHash`, and the values will represent the owner address and expiry time respectively.



