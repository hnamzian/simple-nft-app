// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TreeFactory.sol";
import "./Oxygens.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TreeToken is TreeFactory, Oxygens, ERC721 {
    constructor() ERC721("eTree Token", "TRE") {}

    /**
     * @dev mints a new tree with parameters passed and transfers values to contract address
     * according to tree prices.
     * @param typeName_ tree type name
     * @param region_ region tree has been planted
     * @param birthDate_ birth date of tree
     * @param height_ height of tree
     * @param diameter_ diameter of tree
     */
    function purchaseTree(
        string calldata typeName_,
        string calldata region_,
        uint256 birthDate_,
        uint8 height_,
        uint8 diameter_
    ) public payable {
        (, , uint256 _price) = getTreeTypeByName(typeName_);
        require(msg.value >= _price, "insufficient value to purchase tree");

        _updateOxygensOf(msg.sender);

        uint256 _treeId = _createTree(
            msg.sender,
            typeName_,
            region_,
            birthDate_,
            height_,
            diameter_
        );

        _mint(msg.sender, _treeId);

        if (msg.value > _price) {
            payable(msg.sender).transfer(msg.value - _price);
        }
    }
}
