require("@nomicfoundation/hardhat-toolbox");

// Tasks
task(
  "accounts",
  "Prints the list of accounts and their balance",
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      const provider = hre.ethers.provider;
      const balance = await provider.getBalance(account.address);

      console.log(account.address, ": ", balance);
    }
  }
);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contracts",
    artifacts: "./src/artifacts",
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
