// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Gold is ERC20, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    mapping(address => bool) private _blackList;
    event BlacklistAdded(address account);
    event BlacklistRemoved(address account);

    constructor() ERC20("GOLD", "GLD") {
        // set for owner contract Admin and Pause role
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);

        // mint 1 million tokens GOLD to owner address
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    // only PAUSER_ROLE has permisson to pause contract
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    // only PAUSER_ROLE has permisson to unpause contract
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    // override _beforeTokenTransfer from ERC20
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        require(
            _blackList[from] == false,
            "God: account sender was on blacklist"
        );
        require(
            _blackList[to] == false,
            "God: account recipient was on blacklist"
        );
        super._beforeTokenTransfer(from, to, amount);
    }

    // only ADMIN ROLE has permission to add account to blacklist
    function addToBlackList(address _account)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        // owner can not add himself to blacklist
        require(
            _account != msg.sender,
            "Gold: must not add sender to blacklist"
        );
        require(
            _blackList[_account] == false,
            "Gold: account was on blacklist"
        );
        _blackList[_account] = true;
        emit BlacklistAdded(_account);
    }

    // only ADMIN ROLE has permission to remove account from blacklist
    function removeFromBlackList(address _account)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(
            _blackList[_account] == true,
            "Gold: account was not on blacklist"
        );
        _blackList[_account] = false;
        emit BlacklistRemoved(_account);
    }
}
