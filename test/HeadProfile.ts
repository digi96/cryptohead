import { expect } from "chai";
import { ethers } from "hardhat";

describe("HeadProfile", function () {
  async function deployHeadProfile() {
    const HeadProfile = await ethers.getContractFactory("HeadProfile");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const contract = await HeadProfile.deploy();
    await contract.deployed();

    return { HeadProfile, contract, owner, addr1, addr2 };
  }

  describe("Profile Creation", () => {
    it("Should get ProfileCreated event after profile has been created", async function () {
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
      //console.log(profile);
      await expect(contract.createProfile(profile))
        .to.emit(contract, "ProfileCreated")
        .withArgs(1, 1, "Bevis Lin", "bevis.tw@gmail.com");
    });

    it("Should be able to get profile by address", async function () {
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
      //console.log(profile);
      await contract.createProfile(profile);
      const userProfile = await contract.getProfileInfoByAddress(owner.address);
      //console.log(userProfile);
      expect(userProfile.userId.toNumber()).to.be.equal(1);
    });

    it("Should return a 6 digit number", async function () {
      const { contract } = await deployHeadProfile();
      const radomNumber = await contract.getSixDigitRandom();
      //console.log("randomNumber:", radomNumber);
      expect(radomNumber.toString().length).length.to.be.equal(6);
    });

    it("Should be able to request email verification", async function () {
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
      //console.log(profile);
      await contract.createProfile(profile);
      await expect(contract.requestEmailVerificationCode())
        .to.emit(contract, "EmailVerificationRequested")
        .withArgs(owner.address, profile.email);
    })
  });
});
