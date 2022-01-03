pragma solidity >=0.4.22 <0.9.0;

import "./ERC20.sol";

contract myToken is ERC20 {
    constructor() ERC20("TestToken", "TST") {
        _mint(msg.sender, 10000 * 10**18);
    }
}
