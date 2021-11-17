// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../TreeFactory.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract MockTreeFactory is TreeFactory {
    function createTree(
        address owner_,
        string memory typeName_,
        string memory region_,
        uint256 birthDate_,
        uint8 height_,
        uint8 diameter_
    ) public returns (uint256) {
        return _createTree(owner_, typeName_, region_, birthDate_, height_, diameter_);
    }

    function updateTreesOfOnTransfer(
        address from_,
        address to_,
        uint256 treeId_
    ) public {
        _updateTreesOfOnTransfer(from_, to_, treeId_);
    }
}
