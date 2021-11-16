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
}