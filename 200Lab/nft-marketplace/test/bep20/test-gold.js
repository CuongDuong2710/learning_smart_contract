const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GOLD", function () {
    let [accountA, accountB, accountC] = []
    let token
    let amount = ethers.utils.parseUnits("100", "ether")
    let address0 = "0x0000000000000000000000000000000000000000"
    let totalSupply = ethers.utils.parseUnits("1000000", "ether")
    beforeEach(async () => {
        [accountA, accountB, accountC] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Gold");
        token = await Token.deploy()
        await token.deployed()
    })
    describe("common", function () {
        it("total supply should return right value", async function () {
            expect(await token.totalSupply()).to.be.equal(totalSupply)
        });
        it("balance of account A should return right value", async function () {
            expect(await token.balanceOf(accountA.address)).to.be.equal(totalSupply)
        });
        it("balance of account B should return right value", async function () {
            expect(await token.balanceOf(accountB.address)).to.be.equal(0)
        });
        it("allowance of account A should return right value", async function () {
            expect(await token.allowance(accountA.address, accountB.address)).to.be.equal(0)
        });
    })
    describe("pause()", function () {
        it("should revert if not pauser role", async function () {
            await expect(token.connect(accountB).pause()).to.be.reverted
        });
        it("should revert if contract has been paused", async function () {
            await token.pause()
            await expect(token.pause()).to.be.revertedWith("Pausable: paused")
        });
        it("should pause contract correctly", async function () {
            const pauseTx = await token.pause()
            await expect(pauseTx).to.be.emit(token, "Paused").withArgs(accountA.address)
            await expect(token.transfer(accountB.address, amount)).to.be.revertedWith("Pausable: paused")
        });
    })
    describe("unpause()", function () {
        beforeEach(async () => {
            await token.pause()
        })
        it("should revert if not pauser role", async function () {
            await expect(token.connect(accountB).unpause()).to.be.reverted
        });
        it("should revert if contract has been unpause", async function () {
            await token.unpause()
            await expect(token.unpause()).to.be.revertedWith("Pausable: not paused")
        });
        it("should pause contract correctly", async function () {
            const unpauseTx = await token.unpause()
            await expect(unpauseTx).to.be.emit(token, "Unpaused").withArgs(accountA.address)
            let transferTx = await token.transfer(accountB.address, amount)
            await expect(transferTx).to.emit(token, 'Transfer').withArgs(accountA.address, accountB.address, amount)
        });
    })
    describe("addToBlackList()", function () {
        it("should revert in case add sender to blacklist", async function () {
            await expect(token.addToBlackList(accountA.address)).to.be.revertedWith("Gold: must not add sender to blacklist")
        });
        it("should revert if account has been added to blacklist", async function () {
            await token.addToBlackList(accountB.address)
            await expect(token.addToBlackList(accountB.address)).to.be.revertedWith("Gold: account was on blacklist")
        });
        it("should revert if not admin role", async function () {
            await expect(token.connect(accountB.address).addToBlackList(accountC.address)).to.be.reverted
        });
        it("should add To BlackList correctly", async function () {
            await token.transfer(accountB.address, amount)
            await token.transfer(accountC.address, amount)
            await token.addToBlackList(accountB.address)
            await expect(token.connect(accountB).transfer(accountC.address, amount)).to.be.revertedWith("Gold: account sender was on blacklist")
            await expect(token.connect(accountC).transfer(accountB.address, amount)).to.be.revertedWith("Gold: account recipient was on blacklist")
        });
    })
    describe("removeFromBlackList()", function () {
        beforeEach(async () => {
            await token.transfer(accountB.address, amount)
            await token.transfer(accountC.address, amount)
            await token.addToBlackList(accountB.address)
        })
        it("should revert if account has not been added to blacklist", async function () {
            await token.removeFromBlackList(accountB.address)
            await expect(token.removeFromBlackList(accountB.address)).to.be.revertedWith("Gold: account was not on blacklist")
        });
        it("should revert if not admin role", async function () {
            await expect(token.connect(accountB.address).removeFromBlackList(accountC.address)).to.be.reverted
        });
        it("should remove from BlackList correctly", async function () {
            await token.removeFromBlackList(accountB.address)
            let transferTx = await token.transfer(accountB.address, amount)
            await expect(transferTx).to.emit(token, 'Transfer').withArgs(accountA.address, accountB.address, amount)
        });
    })
});
