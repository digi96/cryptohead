// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeadProfile {
    using Counters for Counters.Counter;
    Counters.Counter private _userIdCounter;
    enum HeadType {
        Vip,
        Store
    }

    struct ProfileInfo {
        uint256 userId;
        HeadType userType;
        address payable userAddress;
        string displayName;
        string email;
        bool isEmailVerified;
        uint256 lastUpdate;
    }

    mapping(address => ProfileInfo) private users;

    event ProfileCreated(
        uint256 indexed userId,
        HeadType userType,
        string displayName,
        string email
    );

    function createProfile(ProfileInfo memory _profile) public {
        _userIdCounter.increment();
        _profile.userId = _userIdCounter.current();
        users[msg.sender] = _profile;

        emit ProfileCreated(_profile.userId, _profile.userType, _profile.displayName, _profile.email);
    }
}