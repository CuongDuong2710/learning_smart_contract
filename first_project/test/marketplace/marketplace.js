const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("marketplace", function () {
  let [admin, seller, buyer, feeRecipient, samplePaymentToken] = [];
  let petty;
  let gold;
  let marketplace;
  let defaultFeeRate = 10;
  let defaultFeeDecimal = 0;
  let defaultPrice = ethers.utils.parseEther("100");
  let defaultBalance = ethers.utils.parseEther("1000");
  let address0 = "0x0000000000000000000000000000000000000000";
  beforeEach(async () => {
    [admin, seller, buyer, feeRecipient, samplePaymentToken] =
      await ethers.getSigners();

    // deployed Petty contract
    const Petty = await ethers.getContractFactory("Petty");
    petty = await Petty.deploy();
    await petty.deployed();

    // deployed Gold contract
    const Gold = await ethers.getContractFactory("Gold");
    gold = await Gold.deploy();
    await gold.deployed();

    // deployed Marketplace contract
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(
      petty.address,
      defaultFeeDecimal,
      defaultFeeRate,
      feeRecipient.address
    );
    await marketplace.deployed();
    await marketplace.addPaymentToken(gold.address); // add payment token
    await gold.transfer(seller.address, defaultBalance);
    await gold.transfer(buyer.address, defaultBalance);
  });
  describe("common", function () {
    it("feeDecimal should return correct value", async function () {
      expect(await marketplace.feeDecimal()).to.be.equal(defaultFeeDecimal);
    it("feeRate should return correct value", async function () {
      expect(await marketplace.feeRate()).to.be.equal(defaultFeeRate);
    });
    it("feeRecipient should return correct value", async function () {
      expect(await marketplace.feeRecipient()).to.be.equal(
        feeRecipient.address
      );
    });
  });
});
