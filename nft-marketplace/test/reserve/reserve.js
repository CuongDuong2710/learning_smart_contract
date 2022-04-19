const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reserve", function () {
  let [admin, receiver, seller, buyer] = [];
  let gold;
  let reserve;
  let address0 = "0x0000000000000000000000000000000000000000";
  let reserveBalance = ethers.utils.parseEther("1000");
  let oneWeek = 86400 * 7;
  beforeEach(async () => {
    [admin, receiver, seller, buyer] = await ethers.getSigners();
    const Gold = await ethers.getContractFactory("Gold");
    gold = await Gold.deploy();
    await gold.deployed();
    const Reserve = await ethers.getContractFactory("Reserve");
    reserve = await Reserve.deploy();
    await reserve.deployed(gold.address);
  });
  // aaaaaaa
});
