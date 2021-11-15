// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TreeTypes.sol";
import "./Trees.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TreeFactory is Trees, TreeTypes {
    using EnumerableSet for EnumerableSet.UintSet;

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
        string memory typeName_,
        string memory region_,
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
