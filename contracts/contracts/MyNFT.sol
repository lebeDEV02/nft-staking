pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC1155, Ownable {
    uint256 public constant INVESTMENT = 0;

    constructor()
        public
        ERC1155(
            "https://bafkreiegch7f4reb7zn3x2jwdaonj26i3q6nrteflbgu2kcdjgifuzlvmu.ipfs.dweb.link/"
        )
    {
        _mint(msg.sender, INVESTMENT, 250, "");
    }
}
