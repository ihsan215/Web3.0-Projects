import React from "react";
import Header from "./header/Header.js";
import web3 from "./web3/web3.js";
import Lottery from "./contract/lottery.js";
import Input from "./forms/Input.js";

function App() {
  return (
    <React.Fragment>
      <Header web3={web3} />
      <Input Lottery={Lottery} />
    </React.Fragment>
  );
}

export default App;
