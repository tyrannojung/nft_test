require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

const readline = require('readline');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
        url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
        accounts: [
            `${process.env.PRIVATE_KEY}`,
        ],
    },
},
};
