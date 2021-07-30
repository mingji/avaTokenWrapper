//SPDX-License-Identifier: mit
pragma solidity 0.7.6;

import "./AvaToken.sol";

contract Wrapper {
    AvaToken public tokenC;

    constructor (address _tokenC) {
        tokenC = AvaToken(_tokenC);
    }
    /**
     * Convert an amount of input token_ to an equivalent amount of the output token
     *
     * @param token_ address of token to swap
     * @param amount amount of token to swap/receive
     */
    function swap(address token_, uint amount) external {
        require(amount > 0, "Wrapper: not zero");
        uint senderBalance = IERC20(token_).balanceOf(address(msg.sender));
        require(senderBalance >= amount, "Wrapper: insufficient balance");
        IERC20(token_).transferFrom(msg.sender, address(this), amount);
        tokenC.mint(msg.sender, amount);
    }

    /**
     * Convert an amount of the output token to an equivalent amount of input token_
     *
     * @param token_ address of token to receive
     * @param amount amount of token to swap/receive
     */
    function unswap(address token_, uint amount) external {
        require(amount > 0, "Wrapper: not zero");
        uint senderBalance = IERC20(tokenC).balanceOf(address(msg.sender));
        require(senderBalance >= amount, "Wrapper: insufficient balance");
        tokenC.transferFrom(msg.sender, address(this), amount);
        IERC20(token_).transfer(msg.sender, amount);
    }
}
