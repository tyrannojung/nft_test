// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract BabyAlpha is ERC721 {
    constructor() ERC721("Test Alpha", "Test ALPHA") {
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmQcnmTtQonYmacvjKJPT7XuePfvWoc2gpKe8C6PncU4tw/";
    }

    function mint(uint tokenId) public {
        _mint(msg.sender, tokenId);
    }
}