//SPDX-License-Identifier: mit
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AvaToken is ERC20, Ownable{
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) public {

    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}