## Create Hardhad project

To setup a Hardhat project, Open up a terminal and execute these commands

```sh
mkdir hardhat-tutorial
cd hardhat-tutorial
npm init --yes
npm install --save-dev hardhat
```

In the same directory where you installed Hardhat run:

```sh
npx hardhat
```

- Select `Create a basic sample project`

- Press enter for the already specified `Hardhat Project root`

- Press enter for the question on if you want to add a `.gitignore`

- Press enter for `Do you want to install this sample project's dependencies with npm (@nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers)?`

If you are not on mac, please do this extra step and install these libraries as well :)

```sh
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```
## Compile and Deploy Smart Contract

Now create a `.env` file in the `hardhat-tutorial` folder and add the following lines, use the instructions in the comments to get your Alchemy API Key URL and RINKEBY Private Key. Make sure that the account from which you get your rinkeby private key is funded with Rinkeby Ether.

```sh
// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard and select the network as Rinkeby, and replace "add-the-alchemy-key-url-here" with its key url
ALCHEMY_API_KEY_URL="add-the-alchemy-key-url-here"

// Replace this private key with your RINKEBY account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
RINKEBY_PRIVATE_KEY="add-the-rinkeby-private-key-here"
```

Now we will install `dotenv` package to be able to import the env file and use it in our config. Open up a terminal pointing athardhat-tutorial directory and execute this command

```sh
npm install dotenv
```

Now open the hardhat.config.js file, we would add the `rinkeby` network here so that we can deploy our contract to rinkeby. Replace all the lines in the hardhar.config.js file with the given below lines

```sh
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
    },
  },
};
```

Compile the contract, open up a terminal pointing at `hardhat-tutorial` directory and execute this command

```sh
npx hardhat compile
```

To deploy, open up a terminal pointing at `hardhat-tutorial` directory and execute this command

```sh
npx hardhat run scripts/deploy.js --network rinkeby
```

## Create NextJS app

To create `next-app`, in terminal

```sh
npx create-next-app@latest
```

and press enter for all the questions

Now to run the app, execute these commands in the terminal

```sh
cd my-app
npm run dev
```

Now go to `http://localhost:3000`, your app should be running 🤘




