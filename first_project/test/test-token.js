const { expect } = require('chai')
const { ethers } = require('hardhat')

describe("ERC-20 BEP-20 sample token", function() {
    let [accountA, accountB, accountC] = []
    let token
    let amount = 100
    let totalSupply = 1000000
    beforeEach(async () => {
        [accountA, accountB, accountC] = await ethers.getSigners()
        const Token = ethers.getContractFactory("SampleToken")
        token = await Token.deploy()
        await token.deployed()
    })
    describe("common", function() {
        it("total supply should return right value", async function(){
            expect(await token.totalSupply()).to.be.equal(totalSupply)
        })
        it("balance of account A should return right value", async function(){
            expect(await token.balanceOf(accountA.address)).to.be.equal(totalSupply)
        })
        it("balance of account B should return right value", async function(){
            expect(await token.balanceOf(accountB.address)).to.be.equal(0)
        })
        it("allowance of account A to account B should return right value", async function(){
            expect(await token.allowance(accountA.address, accountB.address)).to.be.equal(0)
        })
    })
    describe("transfer", function() {
        it("transfer should revert if amount exceeds balance", async function(){
            
        })
        it("transfer should work correctly", async function(){
            
        })
    })
    describe("transferFrom", function() {
        it("transferFrom should revert if amount exceeds balance", async function(){
            
        })
        it("transferFrom should revert if amount exceeds allowance amount", async function(){
            
        })
        it("transferFrom should work correctly", async function(){
            
        })
    })
    describe("approve", function() {
        it("approve should work correctly", async function(){
            
        })
    })
})