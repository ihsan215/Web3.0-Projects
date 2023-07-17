import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Web3Context from "./Web3-context.js";
import ContractInfo from "../contract/TodoContract.js";
import web3 from "./web3.js";

const Web3Provider = (props) => {
  const [WalletAccounts, setWalletAccount] = useState([]);
  const [Contract, setContract] = useState(undefined);

  const getWalletAcoounts = async () => {
    const accounts = await web3.eth.getAccounts();
    setWalletAccount(accounts);
  };

  const createContractInstance = async () => {
    const contract = await new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    setContract(contract);
  };

  useEffect(() => {
    getWalletAcoounts();
    createContractInstance();
  }, []);

  // Assign all data
  const web3Context = {
    web3: web3,
    WalletAccounts: WalletAccounts,
    Contract: Contract,
  };

  return (
    <React.Fragment>
      <Web3Context.Provider value={web3Context}>
        {props.children}
      </Web3Context.Provider>
    </React.Fragment>
  );
};

export default Web3Provider;
