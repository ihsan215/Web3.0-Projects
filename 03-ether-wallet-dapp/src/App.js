import { Button, Form } from "react-bootstrap";
import "./App.css";
import EtherWallet from "./artifacts/contracts/EtherWallet.sol/EtherWallet.json";
import metamaskLogo from "./img/metamask.png";
import handLogo from "./img/wave.png";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false);

  const [scBalance, setScBalance] = useState(0);
  const [ethToUserForDeposit, setEthToUseForDeposit] = useState(0);

  const ContractAdr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    async function getEtherWalletBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ContractAdr,
          EtherWallet.abi,
          provider
        );
        let balance = await contract.balanceOf();
        balance = ethers.utils.formatEther(balance);
        setScBalance(balance);
        console.log("sc balance", balance);
      } catch (e) {
        console.log(e);
      }
    }
    getEtherWalletBalance();
  }, []);

  const connectMetamask = async () => {
    console.log("connecting metamask ...");
    setShouldDisable(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();

      const account = await signer.getAddress();
      let balance = await signer.getBalance();
      balance = ethers.utils.formatEther(balance);
      setAccount(account);
      setBalance(balance);
      setIsActive(true);
      setShouldDisable(false);
    } catch (e) {
      console.log(e);
    }
  };

  const disconnectAccount = async () => {
    try {
      setAccount("");
      setBalance(0);
      setIsActive(false);
      setShouldDisable(false);
    } catch (error) {
      console.log(error);
    }
  };

  const depositHandle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(ContractAdr, EtherWallet.abi, signer);
    const transaction = await contract.deposit({
      value: ethers.utils.parseEther(ethToUserForDeposit),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isActive ? (
          <>
            {" "}
            <Button
              variant="secondary"
              onClick={connectMetamask}
              disabled={shouldDisable}
            >
              <img src={metamaskLogo} alt="metamask" width="50" height="50" />{" "}
              Connect Metamask
            </Button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Button variant="danger" onClick={disconnectAccount}>
              Disconnect Metamask{" "}
              <img src={handLogo} alt="metamask" width="50" height="50" />
            </Button>
            <div className="mt-2 mb-2">Connected Account : {account}</div>
            <div className="mt-2 mb-2">Balance : {balance}</div>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter the amount int ETH"
                  onChange={(e) => setEthToUseForDeposit(e.target.value)}
                ></Form.Control>
                <Button variant="primary" onClick={depositHandle}>
                  Deposit to EhterWallet SmartContract
                </Button>
              </Form.Group>
            </Form>
            <div className="mt-2 mb-2">Contract Balance : {scBalance}</div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
