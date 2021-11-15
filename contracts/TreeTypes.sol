// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TreeTypes is Ownable {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    /**
     * @dev TreeType structure
     * @param name tree type name
     * @param O2Rate_ Oxygen emission rate of tree type
     * @param price_ unit price of tree type
     */
    struct TreeType {
        string name;
        uint256 O2Rate;
        uint256 price;
    }

    // _treeTypes maps treeTypeId to TreeType struct
    mapping(bytes32 => TreeType) internal _treeTypes;

    // _treeTypeIdsSet provides CRUD operation over tree type Ids
    EnumerableSet.Bytes32Set internal _treeTypeIdsSet;


    /**
     * @dev returns tree type structure data related to specified tree type name
     * @param name_ tree type name
     * @return _name tree type name
     * @return _O2Rate Oxygen emission rate of tree type
     * @return _price unit price of tree type
     */
    function getTreeTypeByName(string calldata name_)
        public
        view
        returns (
            string memory _name,
            uint256 _O2Rate,
            uint256 _price
        )
    {
        bytes32 _typeId = keccak256(abi.encodePacked(name_));

        require(_treeTypeIdsSet.contains(_typeId), "tree type name does not exist");

        TreeType memory _treeType = _treeTypes[_typeId];

        _name = _treeType.name;
        _O2Rate = _treeType.O2Rate;
        _price = _treeType.price;
    }

    /**
     * @dev adds new tree type allowed by owner
     * @param name_ tree type name
     * @param O2Rate_ Oxygen emission rate of tree type
     * @param price_ unit price of tree type
     */
    function addTreeType(
        string calldata name_,
        uint256 O2Rate_,
        uint256 price_
    ) public onlyOwner {
        bytes32 _typeId = keccak256(abi.encodePacked(name_));

        // add new tree type if not exists
        if (_treeTypeIdsSet.contains(_typeId)) {
            _treeTypes[_typeId] = TreeType(name_, O2Rate_, price_);

            _treeTypeIdsSet.add(_typeId);
        }
    }

    /**
     * @dev removes a tree type Id related to tree type name
     * @param name_ tree type name
     */
    function removeTreeTypeByName(string calldata name_) public onlyOwner {
        bytes32 _typeId = keccak256(abi.encodePacked(name_));

        _treeTypeIdsSet.remove(_typeId);
    }
}
