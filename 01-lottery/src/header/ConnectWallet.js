import React from "react";
import { useState } from "react";

import Button from "../UI/Button.js";
import Modal from "../UI/Modal.js";

const ConnectWallet = (props) => {
  const [showModal, setshowModal] = useState(false);

  const [modalMsg, setModalMsg] = useState("wating...");

  const onConnect = async () => {
    setshowModal(true);

    if (!window.ethereum) {
    }

    const accounts = await props.web3.eth.getAccounts();
    if (!accounts.length) {
      setModalMsg("Plase connect account");
    } else {
      setModalMsg("Already Connected");
    }

    setTimeout(() => {
      closeModel();
    }, 3000);
  };

  const closeModel = () => {
    setshowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={onConnect}>Connect Wallet</Button>
      {showModal && <Modal onClose={closeModel} msg={modalMsg} />}
    </React.Fragment>
  );
};

export default ConnectWallet;
