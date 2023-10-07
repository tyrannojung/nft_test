const hre = require("hardhat");


async function main() {
    console.log(`
============================================================
               *** Deploying $ TESTALPHA ***
    ____  ___    ______  __   ___    __    ____  __  _____
   / __ )/   |  / __ ) \/ /  /   |  / /   / __ \/ / / /   |
  / __  / /| | / __  |\  /  / /| | / /   / /_/ / /_/ / /| |
 / /_/ / ___ |/ /_/ / / /  / ___ |/ /___/ ____/ __  / ___ |
/_____/_/  |_/_____/ /_/  /_/  |_/_____/_/   /_/ /_/_/  |_|

============================================================
    `)

    const BabyAlpha = await hre.ethers.getContractFactory("BabyAlpha");
    const baby_alpha = await BabyAlpha.deploy();

    await baby_alpha.deployed();

    console.log(
        `BabyAlpha Contract deployed to ${baby_alpha.address}`
    );

    for (let i = 1; i <= 10; i++) {
        const tx = await baby_alpha.mint(i);
        const receipt = await tx.wait();
        console.log(
            `TestAlpha #${i} minted via Tx ${receipt.transactionHash}(gas: ${receipt.gasUsed})`
        );
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
