import { expect } from "chai";
import { ethers } from "hardhat";

describe("HeadProfile", async function () {
  async function deployHeadProfile() {
    const HeadProfile = await ethers.getContractFactory("HeadProfile");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const contract = await HeadProfile.deploy();
    await contract.deployed();

    return { HeadProfile, contract, owner, addr1, addr2 };
  }

  const { contract, owner } = await deployHeadProfile();

  const profile = {
    userId: 0,
    userType: 1,
    userAddress: owner.address,
    displayName: "Bevis Lin",
    email: "bevis.tw@gmail.com",
    isEmailVerified: false,
    lastUpdate: "1655445559",
    emailVerifyNumber: 0,
  };

  describe("Profile Creation", () => {
    it("Should get ProfileCreated event after profile has been created", async function () {
      //const { contract, owner } = await deployHeadProfile();
      await expect(contract.createProfile(profile))
        .to.emit(contract, "ProfileCreated")
        .withArgs(1, 1, "Bevis Lin", "bevis.tw@gmail.com");
    });

    it("Should be able to get profile by address", async function () {
      //const { contract, owner } = await deployHeadProfile();
      const userProfile = await contract.getProfileInfoByAddress(owner.address);
      //console.log(userProfile);
      expect(userProfile.userId.toNumber()).to.be.equal(1);
    });

    it("Should be able to request email verification", async function () {
      //const { contract, owner } = await deployHeadProfile();
      await expect(contract.requestEmailVerificationCode())
        .to.emit(contract, "EmailVerificationRequested")
        .withArgs(owner.address, profile.email);
    });
  });
});
