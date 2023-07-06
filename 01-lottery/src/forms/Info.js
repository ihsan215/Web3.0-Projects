import React from "react";
import web3 from "../web3/web3.js";
import { useState, useEffect } from "react";

import classes from "./Info.module.css";

const Info = (props) => {
  const [amount, setAmount] = useState(0);
  const [participants, setparticipants] = useState(0);
  const [manager, setManager] = useState("");

  useEffect(() => {
    const getManager = async () => {
      try {
        const manager = await props.Lottery.methods.manager().call();
        setManager(String(manager));
      } catch {
        setManager("-1");
      }
    };

    const getAmount = async () => {
      try {
        const totalAmount = await web3.eth.getBalance(
          props.Lottery.options.address
        );

        setAmount(web3.utils.fromWei(totalAmount, "ether"));
      } catch {
        setManager("-1");
      }
    };

    const getParticipants = async () => {
      try {
        const Allparticipants = await props.Lottery.methods
          .returnArrays()
          .call();

        setparticipants(Allparticipants.length);
      } catch {
        setparticipants(-1);
      }
    };

    getManager();
    getAmount();
    getParticipants();
  }, []);

  return (
    <React.Fragment>
      <div className={classes["main-area"]}>
        <p className={classes["tag"]}>
          Lottery Owner :{" "}
          <span className={classes["value"]}>{`${manager.slice(
            0,
            5
          )}...${manager.slice(manager.length - 4, manager.length)}`}</span>
        </p>
        <p className={classes["tag"]}>
          Total Amount : <span className={classes["value"]}>{amount}</span>
        </p>
        <p className={classes["tag"]}>
          Total Participants :{" "}
          <span className={classes["value"]}>{participants}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Info;
