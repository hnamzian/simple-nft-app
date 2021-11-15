// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TreeTypes.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TreeFactory is TreeTypes {
    using EnumerableSet for EnumerableSet.UintSet;

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
        uint256 plantedDate;
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
     * @dev returns Ids of trees owned by a specific account
     * @param owner_ owner of trees
     * @return list of tree Ids
     */
    function getTreesOf(address owner_) public view returns (uint256[] memory) {
        return _treesOf[owner_].values();
    }

    /**
     * @dev creates new tree owned by specified address
     * @param owner_ tree owner
     * @param typeName_ tree type name
     * @param region_ region tree has been planted
     * @param birthDate_ birth date of tree
     * @param height_ height of tree
     * @param diameter_ diameter of tree
     */
    function _createTree(
        address owner_,
        string calldata typeName_,
        string calldata region_,
        uint256 plantedDate_,
        uint256 birthDate_,
        uint8 height_,
        uint8 diameter_
    ) public payable {
        Tree memory _tree = Tree(
            typeName_,
            region_,
            plantedDate_,
            birthDate_,
            height_,
            diameter_,
            block.timestamp
        );
        _trees.push(_tree);
        uint256 _treeId = _trees.length - 1;

        _treesOf[owner_].add(_treeId);
    }
}
