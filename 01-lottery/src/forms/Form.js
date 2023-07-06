import React from "react";
import web3 from "../web3/web3";
import clases from "./form.module.css";

const Form = (props) => {
  const enterLottery = async (e) => {
    e.preventDefault();
    const number = e.target.querySelector('input[name="valueInput"]');
    const lotteryValue = number.value;
    const accounts = await web3.eth.getAccounts();
    await props.Lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(lotteryValue, "ether"),
    });

    number.value = "";
  };

  return (
    <React.Fragment>
      <div className={clases["input-area"]}>
        <form onSubmit={enterLottery}>
          <input
            name="valueInput"
            className={clases["input-text"]}
            type="number"
            step="0.01"
            placeholder="Enter a value"
          />
          <br />
          <input
            className={clases["input-btn"]}
            type="submit"
            value="Enter Lottery"
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Form;
