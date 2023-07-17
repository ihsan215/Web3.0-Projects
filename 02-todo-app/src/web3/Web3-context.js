import React from "react";

const Web3Context = React.createContext({
  web3: undefined,
  WalletAccounts: [],
  Contract: undefined,
});

export default Web3Context;
