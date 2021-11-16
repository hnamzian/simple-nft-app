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
     * @return name tree type name
     * @return O2Rate Oxygen emission rate of tree type
     * @return price unit price of tree type
     */
    function getTreeTypeByName(string memory name_)
        public
        view
        returns (
            string memory name,
            uint256 O2Rate,
            uint256 price
        )
    {
        bytes32 _typeId = keccak256(abi.encodePacked(name_));

        require(_treeTypeIdsSet.contains(_typeId), "tree type name does not exist");

        TreeType memory _treeType = _treeTypes[_typeId];

        name = _treeType.name;
        O2Rate = _treeType.O2Rate;
        price = _treeType.price;
    }

    /**
     * returns all existing tree type Ids
     * @return list of tree type ids
     */
    function getTreeTypeIds() public view returns (bytes32[] memory) {
        return _treeTypeIdsSet.values();
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
        if (!_treeTypeIdsSet.contains(_typeId)) {
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

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
