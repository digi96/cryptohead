import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HeadProfile } from "../typechain-types";

describe("HeadProfile", function () {
  let contract: HeadProfile;

  this.beforeEach(async () => {
    const HeadProfile = await ethers.getContractFactory("HeadProfile");
    contract = await HeadProfile.deploy();
  });

  describe("Profile Creation", () => {
    it("Should get event with args user id = 1", async function () {
      await contract.deployed();
      const [owner] = await ethers.getSigners();
      const profile = {
        userId: 0,
        userType: 1,
        userAddress: owner.address,
        displayName: "Bevis Lin",
        email: "bevis.tw@gmail.com",
        isEmailVerified: false,
        lastUpdate: "1655445559",
      };
      console.log(profile);
      await expect(contract.createProfile(profile))
        .to.emit(contract, "ProfileCreated")
        .withArgs(1, 1, "Bevis Lin", "bevis.tw@gmail.com");
    });

    it("Should be able to get profile by address", async function () {
      //await contract.deployed();
      const [owner] = await ethers.getSigners();
      const userProfile = await contract.getProfileByAddress(owner.address);
      console.log(userProfile);
      expect(userProfile.userId.toNumber()).to.be.equal(1);
    })
  });
});
