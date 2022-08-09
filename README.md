# General

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
