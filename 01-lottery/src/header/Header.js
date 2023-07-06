import React from "react";
import Navigation from "./Navigation.js";

const Header = (props) => {
  return (
    <React.Fragment>
      <Navigation web3={props.web3} />
    </React.Fragment>
  );
};

export default Header;
