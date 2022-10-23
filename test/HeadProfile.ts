import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HeadProfile } from "../typechain-types";

describe("HeadProfile", function() {
  let contract: HeadProfile;

  this.beforeEach(async()=>{
    const HeadProfile = await ethers.getContractFactory("HeadProfile");
    contract = await HeadProfile.deploy();
  });

  describe("AddProfile", ()=>{
    it("should return 1 for first user", async function () {
        await contract.deployed();
        const [owner] = await ethers.getSigners();
        const profle = [0, 1, owner, 'Bevis Lin', 'bevis.tw@gmail.com', false, 0];
        
    })
  });
});