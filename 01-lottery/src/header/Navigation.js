import React from "react";
import ConnectWallet from "./ConnectWallet.js";
import logo from "../img/Logo.svg";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <React.Fragment>
      <nav className={classes["header"]}>
        <section className={classes["logo-area"]}>
          <img className={classes["logo"]} src={logo} alt="logo" />
          <h1 className={classes["title"]}>LOTTERY</h1>
        </section>

        <ConnectWallet web3={props.web3} />
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
