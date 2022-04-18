const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Petty", function () {
  let [accountA, accountB, accountC] = [];
  let petty;
  let address0 = "0x0000000000000000000000000000000000000000";
  let uri = "sampleuri.com/";
  beforeEach(async () => {
    [accountA, accountB, accountC] = await ethers.getSigners();
    const Petty = await ethers.getContractFactory("Petty");
    petty = await Petty.deploy();
    await petty.deployed();
  });
  describe("mint", function () {
    it("should revert if mint to zero address", async () => {
      await expect(petty.mint(address0)).to.be.revertedWith(
        "ERC721: mint to the zero address"
      );
    });
    it("should mint token correctly", async () => {
      const mintTx = await petty.mint(accountA.address);
      await expect(mintTx)
        .to.be.emit(petty, "Transfer")
        .withArgs(address0, accountA.address, 1); // (1) is tokenId
      expect(await petty.balanceOf(accountA.address)).to.be.equal(1); // expect balance NFT of account A is 1
      expect(await petty.ownerOf(1)).to.be.equal(accountA.address); // expect ownerOf tokenId (1) is address of account A

      const mintTx2 = await petty.mint(accountA.address);
      await expect(mintTx2)
        .to.be.emit(petty, "Transfer")
        .withArgs(address0, accountA.address, 2); // (2) is tokenId
      expect(await petty.balanceOf(accountA.address)).to.be.equal(2); // expect balance NFT of account A is 2
      expect(await petty.ownerOf(2)).to.be.equal(accountA.address); // expect ownerOf tokenId (2) is address of account A
    });
  });
  describe("update BaseTokenURI", function () {
    it("should update BaseTokenURI correctly", async () => {
      await petty.mint(accountA.address);
      await petty.updateBaseURI(uri);
      expect(await petty.tokenURI(1)).to.be.equal(uri + "1");
    });
  });
});
