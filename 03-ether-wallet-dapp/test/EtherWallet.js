const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("EtherWallet", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const EtherWallet = await hre.ethers.deployContract("EtherWallet");
    await EtherWallet.waitForDeployment();

    return { EtherWallet, owner, otherAccount };
  }

  describe("deployment", function () {
    it("Should deploy and set the owner be the deployer address", async function () {
      const { EtherWallet, owner } = await loadFixture(deployFixture);
      expect(await EtherWallet.owner()).to.equal(owner.address);
    });
  });
});
