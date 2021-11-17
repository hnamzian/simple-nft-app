// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Trees {
    /**
     * @dev Tree Structure
     * @param typeName tree type name
     * @param region region tree has been planted
     * @param birthDate birth date of tree
     * @param height height of tree
     * @param diameter diameter of tree
     * @param transferredAt timestamp tree ownership transfered
     */
    struct Tree {
        string typeName;
        string region;
        uint256 birthDate;
        uint8 height;
        uint8 diameter;
        uint256 transferredAt;
    }
    // list of trees created
    Tree[] internal _trees;
    // list of trees owned by each address
    mapping(address => EnumerableSet.UintSet) internal _treesOf;

    /**
     * @dev returns parameters of a tree with a specified Id
     * @return typeName tree type name
     * @return region region tree has been planted
     * @return birthDate birth date of tree
     * @return height height of tree
     * @return diameter diameter of tree
     * @return transferredAt timestamp tree ownership transfered
     */
    function getTreeById(uint256 treeId_)
        public
        view
        returns (
            string memory typeName,
            string memory region,
            uint256 birthDate,
            uint8 height,
            uint8 diameter,
            uint256 transferredAt
        )
    {
        Tree memory _tree = _trees[treeId_];
        typeName = _tree.typeName;
        region = _tree.region;
        birthDate = _tree.birthDate;
        height = _tree.height;
        diameter = _tree.diameter;
        transferredAt = _tree.transferredAt;
    }
}
