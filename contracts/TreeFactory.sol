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
     * @return _treeId id of created tree
     */
    function _createTree(
        address owner_,
        string memory typeName_,
        string memory region_,
        uint256 birthDate_,
        uint8 height_,
        uint8 diameter_
    ) internal returns (uint256 _treeId) {
        Tree memory _tree = Tree(
            typeName_,
            region_,
            birthDate_,
            height_,
            diameter_,
            block.timestamp
        );
        _trees.push(_tree);
        _treeId = _trees.length - 1;

        _treesOf[owner_].add(_treeId);
    }

    /**
     * @dev updates tree list of both sender and receiver at token transfer
     * @param from_ account to send tree of its own
     * @param to_ account to receive tree
     * @param treeId_ id of token (tree) to be transfered
     */
    function _updateTreesOfOnTransfer(address from_, address to_, uint256 treeId_) internal {
        _treesOf[from_].remove(treeId_);
        _treesOf[to_].add(treeId_);
    }
}
