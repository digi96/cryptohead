// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeadTemplate is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _templateIdCounter;

    struct TemplateData {
        uint256 templateId;
        string title;
        string description;
        string imageURL;
        uint256 quantity;
        uint256 issued;
        address payable owner;
    }

    mapping(address => TemplateData[]) public userTemplates;

    event TemplateCreated(
        uint256 indexed templateId,
        string title,
        string description,
        string imageURL,
        uint256 quantity,
        address payable owner
    );

    function createTemplate(
        TemplateData memory _template
    ) public returns (uint256) {
        _templateIdCounter.increment();
        _template.templateId = _templateIdCounter.current();
        _template.issued = 0;
        _template.owner = payable(msg.sender);

        userTemplates[msg.sender].push(_template);

        emit TemplateCreated(
            _template.templateId,
            _template.title,
            _template.description,
            _template.imageURL,
            _template.quantity,
            _template.owner
        );
        return _template.templateId;
    }

    function getUserTemplatesCount(
        address ownerAddress
    ) public view returns (uint256) {
        return userTemplates[ownerAddress].length;
    }
}
