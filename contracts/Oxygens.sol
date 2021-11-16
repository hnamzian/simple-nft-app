// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Trees.sol";
import "./TreeTypes.sol";

import "hardhat/console.sol";

contract Oxygens is Trees, TreeTypes {
    using EnumerableSet for EnumerableSet.UintSet;

    // reflects total oxygens emitted by all trees (all trees updated foroxygens)
    uint256 internal _totalOxygens;
    // reflects total oxygens emotted by all trees owned by account
    mapping(address => uint256) internal _oxygensOf;

    // reflects last time tree oxygens of an account updated 
    mapping(address => uint256) internal _lastTimeO2Updated;

    /**
     * @dev returns total oxygens emitted by trees
     * @return total amount of oxygens
     */
    function totalOxygens() public view returns (uint256) {
        return _totalOxygens;
    }

    /**
     * @dev updates and returns total amount of oxygens emitted by trees owned by an account
     * @param account_ account address
     * @return total oxygens
     */
    function oxygensOf(address account_) public returns (uint256) {
        _updateOxygensOf(account_);

        console.log(_oxygensOf[account_]);
        return _oxygensOf[account_];
    }

    /**
     * @dev updates amount of oxygens emitted by trees owned by a specified address
     * @param account_ account address which is owner of trees
     */
    function _updateOxygensOf(address account_) internal {
        uint256[] memory _accountTrees = _treesOf[account_].values();

        uint256 _timePassed = block.timestamp - _lastTimeO2Updated[account_];

        uint256 _additionalO2;

        for (uint256 _iter = 0; _iter < _accountTrees.length; _iter++) {
            Tree memory _tree  = _trees[_accountTrees[_iter]];
            (, uint256 _O2Rate, ) = getTreeTypeByName(_tree.typeName);
            _additionalO2 += _timePassed * _O2Rate;
        }

        _oxygensOf[account_] += _additionalO2;
        _totalOxygens += _additionalO2;

        _lastTimeO2Updated[account_] = block.timestamp;
    }
}