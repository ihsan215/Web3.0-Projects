import React from "react";
import Info from "./Info.js";
import Form from "./Form.js";
import web3 from "../web3/web3.js";
import Button from "../UI/Button.js";

import classes from "./Input.module.css";

const Input = (props) => {
  const SelectWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    await props.Lottery.methods.pickWinner().send({
      from: accounts[0],
    });
  };

  return (
    <React.Fragment>
      <div className={classes["user-area"]}>
        <Info Lottery={props.Lottery} />
      </div>
      <Form Lottery={props.Lottery} />
      <Button onClick={SelectWinner} className={classes["select-btn"]}>
        Select Winner
      </Button>
    </React.Fragment>
  );
};

export default Input;
