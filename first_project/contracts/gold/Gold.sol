// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Gold is ERC20, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

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
        super._beforeTokenTransfer(from, to, amount);
    }
}
