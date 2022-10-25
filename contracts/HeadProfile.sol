// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeadProfile is Ownable {
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
        uint emailVerifyNumber;
    }

    mapping(address => ProfileInfo) private users;

    event ProfileCreated(
        uint256 indexed userId,
        HeadType userType,
        string displayName,
        string email
    );

    event EmailVerificationRequested(address userAddress, string email);

    function getSixDigitRandom() public view returns (uint) {
        return (block.timestamp + block.difficulty) % 1000000;
    }

    function createProfile(ProfileInfo memory _profile)
        public
        returns (uint256)
    {
        _userIdCounter.increment();
        _profile.userId = _userIdCounter.current();
        _profile.lastUpdate = block.timestamp;
        users[msg.sender] = _profile;

        emit ProfileCreated(
            _profile.userId,
            _profile.userType,
            _profile.displayName,
            _profile.email
        );
        return _profile.userId;
    }

    function getProfileInfo()
        public
        view
        returns (
            uint256 userId,
            HeadType headType,
            string memory displayName,
            string memory email,
            bool isEmailVerified
        )
    {
        ProfileInfo memory user = users[msg.sender];
        if (user.userId == 0) {
            revert("Profile not exist");
        }
        return (
            user.userId,
            user.userType,
            user.displayName,
            user.email,
            user.isEmailVerified
        );
    }

    function getProfileInfoByAddress(address _address)
        public
        view
        onlyOwner
        returns (
            uint256 userId,
            HeadType headType,
            string memory displayName,
            string memory email,
            bool isEmailVerified
        )
    {
        ProfileInfo memory user = users[_address];
        if (user.userId == 0) {
            revert("Profile not exist");
        }
        return (
            user.userId,
            user.userType,
            user.displayName,
            user.email,
            user.isEmailVerified
        );
    }

    function requestEmailVerificationCode() public {
        ProfileInfo memory user = users[msg.sender];
        if (user.userId == 0) {
            revert("Profile not exist");
        }

        user.emailVerifyNumber = getSixDigitRandom();
        users[msg.sender] = user;

        emit EmailVerificationRequested(msg.sender, user.email);
    }
}
