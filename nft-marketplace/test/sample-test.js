const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hello World", function () {
  const message = "Hello World!!!"
  const messageSecond = "Bonjour World"

  it("Should return message correctly", async function () {
    const HelloWorldFactory = await ethers.getContractFactory('HelloWorld')
    const helloWorldContract = await HelloWorldFactory.deploy(message) // constructor
    // console.log('hello:', helloWorldContract)
    await helloWorldContract.deployed()
    expect(await helloWorldContract.printHelloWorld()).to.be.equal(message)

    await helloWorldContract.updateMessage("Bonjour World1")
    expect(await helloWorldContract.printHelloWorld()).to.be.equal(messageSecond)
  });
});
