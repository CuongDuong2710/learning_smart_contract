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
  /* describe("common", function () {
    it("feeDecimal should return correct value", async function () {
      expect(await marketplace.feeDecimal()).to.be.equal(defaultFeeDecimal);
    });
    it("feeRate should return correct value", async function () {
      expect(await marketplace.feeRate()).to.be.equal(defaultFeeRate);
    });
    it("feeRecipient should return correct value", async function () {
      expect(await marketplace.feeRecipient()).to.be.equal(
        feeRecipient.address
      );
    });
  }); */
  /* describe("updateFeeRecipient", function () {
    it("should revert if fee recipient is zero address", async function () {
      await expect(marketplace.updateFeeRecipient(address0)).to.be.revertedWith(
        "NFTMarketplace: feeRecipient_ is zero address"
      );
    });
    it("should revert if sender isn't contract owner", async function () {
      await expect(
        marketplace.connect(buyer).updateFeeRecipient(address0)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should update correctly", async function () {
      await marketplace.updateFeeRecipient(buyer.address);
      expect(await marketplace.feeRecipient()).to.be.equal(buyer.address);
    });
  }); */
  /* describe("updateFeeRate", function () {
    it("should revert if fee rate >= 10**(feeDecimal_ + 2)", async function () {
      await expect(marketplace.updateFeeRate(0, 100)).to.be.revertedWith(
        "NFTMarketplace: bad fee rate"
      );
    });
    it("should revert if sender isn't contract owner", async function () {
      await expect(
        marketplace.connect(buyer).updateFeeRate(0, 10)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should update correctly", async function () {
      const updateFeeRateTx = await marketplace.updateFeeRate(0, 20);
      expect(await marketplace.feeDecimal()).to.be.equal(0);
      expect(await marketplace.feeRate()).to.be.equal(20);
      await expect(updateFeeRateTx)
        .to.be.emit(marketplace, "FeeRateUpdated")
        .withArgs(0, 20);
    });
  }); */
  /* describe("addPaymentToken", async function () {
    it("should revert paymentToken is address 0", async function () {
      await expect(marketplace.addPaymentToken(address0)).to.be.revertedWith(
        "NFTMarketplace: feeRecipient_ is zero address"
      );
    });
    it("should revert if address is already supported", async function () {
      await marketplace.addPaymentToken(samplePaymentToken.address);
      await expect(
        marketplace.addPaymentToken(samplePaymentToken.address)
      ).to.be.revertedWith("NFTMarketplace: already supported");
    });
    it("should revert if sender is not contract owner", async function () {
      await expect(
        marketplace.connect(buyer).addPaymentToken(samplePaymentToken.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should add payment token correctly", async function () {
      await marketplace.addPaymentToken(samplePaymentToken.address);
      expect(
        await marketplace.isPaymentTokenSupported(samplePaymentToken.address)
      ).to.be.equal(true);
    });
  }); */
  describe("addOrder", function () {
    beforeEach(async () => {
      await petty.mint(seller.address);
    });
    it("should revert if payment token not supported", async function () {
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      await expect(
        marketplace
          .connect(seller)
          .addOrder(1, samplePaymentToken.address, defaultPrice) // only add gold address at beforeEach above
      ).to.be.revertedWith("NFTMarketplace: unsupported token");
    });
    it("should revert if sender is not owner", async function () {
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      await expect(
        marketplace.connect(buyer).addOrder(1, gold.address, defaultPrice)
      ).to.be.revertedWith("NFTMarketplace: sender is not owner of token");
    });
    it("should revert if nft hasn't been approve for marketplace contract", async function () {
      await expect(
        marketplace.connect(seller).addOrder(1, gold.address, defaultPrice)
      ).to.be.revertedWith(
        "NFTMarketplace: The contract is unauthorized to manage this token"
      );
    });
    it("should revert if price = 0", async function () {
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      await expect(
        marketplace.connect(seller).addOrder(1, gold.address, 0)
      ).to.be.revertedWith("NFTMarketplace: price must be greater than 0");
    });
    it("should add order correctly", async function () {
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      const addOrderTx = await marketplace
        .connect(seller)
        .addOrder(1, gold.address, defaultPrice);
      await expect(addOrderTx)
        .to.be.emit(marketplace, "OrderAdded")
        .withArgs(1, seller.address, 1, gold.address, defaultPrice);
    });
  });
});
