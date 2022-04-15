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
  /* describe("addOrder", function () {
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
      expect(await petty.ownerOf(1)).to.be.equal(marketplace.address); // marketplace contract is owner of token

      // add order 2
      await petty.mint(seller.address);
      const addOrderTx2 = await marketplace
        .connect(seller)
        .addOrder(2, gold.address, defaultPrice); // addOrder(1, gold.address, defaultPrice) -> reverted with reason string 'NFTMarketplace: sender is not owner of token'
      await expect(addOrderTx2)
        .to.be.emit(marketplace, "OrderAdded")
        .withArgs(2, seller.address, 2, gold.address, defaultPrice); // withArgs(1, seller.address...) -> AssertionError: Expected "2" to be equal 1
      expect(await petty.ownerOf(2)).to.be.equal(marketplace.address); // marketplace contract is owner of token
    });
  }); */
  /* describe("cancelOrder", function () {
    beforeEach(async () => {
      await petty.mint(seller.address);
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(seller).addOrder(1, gold.address, defaultPrice);
    });
    it("shoule revert if order has been sold", async function () {
      // buyer aprove marketplace contract spends gold token
      await gold.connect(buyer).approve(marketplace.address, defaultPrice);
      // execute order
      await marketplace.connect(buyer).executeOrder(1);
      await expect(
        marketplace.connect(seller).cancelOrder(1)
      ).to.be.revertedWith("NFTMarketplace: buyer must be zero"); // buyer is buyer.address not address(0)
    });
    it("should revert if sender is not order owner", async function () {
      await expect(
        marketplace.connect(buyer).cancelOrder(1)
      ).to.be.revertedWith("NFTMarketplace: seller must be owner");
    });
    it("should cancel order correctly", async function () {
      const cancelTX = await marketplace.connect(seller).cancelOrder(1);
      await expect(cancelTX)
        .to.be.emit(marketplace, "OrderCancelled")
        .withArgs(1);
    });
  }); */
  describe("executeOrder", function () {
    beforeEach(async () => {
      await petty.mint(seller.address);
      await petty.connect(seller).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(seller).addOrder(1, gold.address, defaultPrice);
      await gold.connect(buyer).approve(marketplace.address, defaultPrice);
    });
    it("should revert if sender is seller", async function () {
      await expect(
        marketplace.connect(seller).executeOrder(1) // seller calls function (not true)
      ).to.be.revertedWith(
        "NFTMarketplace: buyer must be different from seller"
      );
    });
    it("should revert if order has been sold", async function () {
      await marketplace.connect(buyer).executeOrder(1);
      await expect(
        marketplace.connect(buyer).executeOrder(1) // execute order one more time -> notify error buyer must be zero to execute
      ).to.be.revertedWith("NFTMarketplace: buyer must be zero");
    });
    it("should revert if order has been cancel", async function () {
      await marketplace.connect(seller).cancelOrder(1);
      await expect(
        marketplace.connect(buyer).executeOrder(1)
      ).to.be.revertedWith("NFTMarketplace: order has been canceled");
    });
    it("should execute order correctly with default fee", async function () {
      const executeTx = marketplace.connect(buyer).executeOrder(1);
      await expect(executeTx).to.be.emit(marketplace, "OrderMatched").withArgs(
        1, // orderId
        seller.address,
        buyer.address,
        1, // tokenId
        gold.address, // paymentToken
        defaultPrice
      );
      // check owner of token is buyer
      expect(await petty.ownerOf(1)).to.be.equal(buyer.address);
      // check balance of seller is defaultBalance + defaultPrice * 90%
      expect(await gold.balanceOf(seller.address)).to.be.equal(
        defaultBalance.add(defaultPrice.mul(80).div(100)) // mul(80).div(100) => AssertionError: Expected "1090000000000000000000" to be equal 1080000000000000000000
      );
      // check balance of buyer is defaultBalance - defaultPrice
      expect(await gold.balanceOf(buyer.address)).to.be.equal(
        defaultBalance.sub(defaultPrice)
      );
      // check balance of feeRecipient is defaultPrice * 10%
      expect(await gold.balanceOf(feeRecipient.address)).to.be.equal(
        defaultPrice.mul(10).div(100)
      );
    });
  });
});
