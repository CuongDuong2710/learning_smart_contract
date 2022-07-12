# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# compile error: Error HH502: Couldn't download compiler versions list. Please check your connection. #2710 (when run "npx hardhat compile")
npx hardhat --show-stack-traces --verbose compile
https://github.com/NomicFoundation/hardhat/pull/1291

# Error: self signed certificate in certificate chain
https://stackoverflow.com/questions/9626990/receiving-error-error-ssl-error-self-signed-cert-in-chain-while-using-npm
https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

#
Verify Contract Address: 0x0aa0cD89DEdb9A87c1f95bFc7ae1cF9F00005146

Error:
Nothing to compile
NomicLabsHardhatPluginError: Failed to send contract verification request.
Endpoint URL: https://api-testnet.polygonscan.com/api
Reason: The Etherscan API responded that the address 0xE4b427C1d72504f12298403DB2f1d5597bD45932 does not have bytecode.
This can happen if the contract was recently deployed and this fact hasn't propagated to the backend yet.
Try waiting for a minute before verifying your contract. If you are invoking this from a script,
try to wait for five confirmations of your contract deployment transaction before running the verification subtask.

=> increate time sleep 
// Wait for etherscan to notice that the contract has been deployed
  await sleep(50000)

Verify Contract Address: 0x0EE9c7d4865d98C1db18140760a8836CF33760E0
Nothing to compile
Successfully submitted source code for contract
contracts/Verify.sol:Verify at 0x0EE9c7d4865d98C1db18140760a8836CF33760E0
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Verify on Etherscan.
https://mumbai.polygonscan.com/address/0x0EE9c7d4865d98C1db18140760a8836CF33760E0#code
