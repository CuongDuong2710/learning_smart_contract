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
